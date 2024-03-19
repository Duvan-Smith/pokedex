import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from '../pokemon/pokemon.service';
import { CreatePokemonDto } from '../pokemon/dto/create-pokemon.dto';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    private readonly httpService: AxiosAdapter,
    private readonly pokemonService: PokemonService,
  ) { }

  async executeSeed() {
    await this.pokemonService.removeMany();

    const data = await this.httpService.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=1000'
    );

    // const insertPromisesArray=[];
    const pokemonToInsert: CreatePokemonDto[] = [];

    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2]

      // await this.pokemonService.create({ name, no });
      // insertPromisesArray.push(this.pokemonService.create({ name, no }));
      pokemonToInsert.push({ name, no });
    })

    // await Promise.all(insertPromisesArray);
    await this.pokemonService.createMany(pokemonToInsert);

    return 'Seed Executed';
  }
}
