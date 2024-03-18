import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModule: Model<Pokemon>
  ) {
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      const pokemon = await this.pokemonModule.create(createPokemonDto);

      return pokemon;
    } catch (error) {
      this.handleExceptions(error, 'create');
    }
  }

  async createMany(createPokemonDtos: CreatePokemonDto[]) {
    createPokemonDtos = createPokemonDtos.map((dto) => {
      dto.name.toLocaleLowerCase();
      return dto;
    })

    try {
      const pokemon = await this.pokemonModule.insertMany(createPokemonDtos);

      return pokemon;
    } catch (error) {
      this.handleExceptions(error, 'create');
    }
  }

  async findAll() {
    return await this.pokemonModule.find();
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    if (!isNaN(+term))
      pokemon = await this.pokemonModule.findOne({ no: term });

    if (!pokemon && isValidObjectId(term))
      pokemon = await this.pokemonModule.findById(term);

    if (!pokemon)
      pokemon = await this.pokemonModule.findOne({ name: term.toLocaleLowerCase() });

    if (!pokemon)
      throw new NotFoundException(`Pokemon with id, namo or no "${term}" not found`);

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);

    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();

    try {
      await pokemon.updateOne(updatePokemonDto, { new: true });

      return {
        ...pokemon.toJSON(),
        ...updatePokemonDto
      };
    } catch (error) {
      this.handleExceptions(error, 'update');
    }
  }

  async remove(id: string) {
    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();
    // const result = await this.pokemonModule.findByIdAndDelete(id);
    const { deletedCount } = await this.pokemonModule.deleteOne({ _id: id });

    if (deletedCount === 0)
      throw new BadRequestException(`Pokemon with id "${id}" not found`);

    return;
  }

  private handleExceptions(error: any, method: string) {
    if (error.code === 11000)
      throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`)

    console.log(error);

    throw new InternalServerErrorException(`Can't ${method} Pokemon - Check server logs`);
  }

  async removeMany() {
    await this.pokemonModule.deleteMany({});
  }
}