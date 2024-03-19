import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';
import { Model, isValidObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectModel(Categoria.name, 'tienda')
    private readonly categoriaModule: Model<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    createCategoriaDto.name = createCategoriaDto.name.toLocaleLowerCase();

    try {
      const categoria = await this.categoriaModule.create(createCategoriaDto);

      return categoria;
    } catch (error) {
      this.handleExceptions(error, 'create');
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 5, offset = 0 } = paginationDto;
    return await this.categoriaModule.find()
      .limit(limit)
      .skip(offset)
      .sort({
        no: 1
      })
      .select('-__v');
  }

  async findOne(id: string) {
    let categoria: Categoria;
    
    if (!categoria && isValidObjectId(id))
      categoria = await this.categoriaModule.findById(id);

      if (!categoria)
      throw new NotFoundException(`Categoria with id, namo or no "${id}" not found`);

    return categoria;
  }

  async update(id: string, updateCategoriaDto: UpdateCategoriaDto) {
    const categoria = await this.findOne(id);

    if (updateCategoriaDto.name)
      updateCategoriaDto.name = updateCategoriaDto.name.toLocaleLowerCase();

    try {
      await categoria.updateOne(updateCategoriaDto, { new: true });

      return {
        ...categoria.toJSON(),
        ...updateCategoriaDto
      };
    } catch (error) {
      this.handleExceptions(error, 'update');
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.categoriaModule.deleteOne({ _id: id });

    if (deletedCount === 0)
      throw new BadRequestException(`Categoria with id "${id}" not found`);

    return;
  }

  private handleExceptions(error: any, method: string) {
    if (error.code === 11000)
      throw new BadRequestException(`Categoria exists in db ${JSON.stringify(error.keyValue)}`)

    console.log(error);

    throw new InternalServerErrorException(`Can't ${method} Categoria - Check server logs`);
  }
}
