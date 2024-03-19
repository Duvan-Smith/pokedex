import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Producto } from './entities/producto.entity';
import { Model, isValidObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductoService {
  constructor(
    @InjectModel(Producto.name, 'tienda')
    private readonly productoModule: Model<Producto>,
  ) { }

  async create(createProductoDto: CreateProductoDto) {
    const { name, ...productoDto } = createProductoDto;

    const data = {
      name: name.toLocaleLowerCase(),
      state: true,
      ...productoDto
    }

    try {
      const producto = await this.productoModule.create(data);

      return producto;
    } catch (error) {
      this.handleExceptions(error, 'create');
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 5, offset = 0 } = paginationDto;
    return await this.productoModule.find()
      .limit(limit)
      .skip(offset)
      .sort({
        no: 1
      });
  }

  async findOne(id: string) {
    let producto: Producto;

    if (!producto && isValidObjectId(id))
      producto = await this.productoModule.findById(id).populate('categoria', 'name');

    if (!producto)
      throw new NotFoundException(`Producto with id, namo or no "${id}" not found`);

    return producto;
  }

  async update(id: string, updateProductoDto: UpdateProductoDto) {
    const producto = await this.findOne(id);

    const { name, ...productoDto } = updateProductoDto;
    let data: any;

    if (name) {
      data = {
        name: name.toLocaleLowerCase(),
        state: true,
        ...productoDto
      }
    }

    try {
      await producto.updateOne(data, { new: true });

      return {
        ...producto.toJSON(),
        ...data
      };
    } catch (error) {
      this.handleExceptions(error, 'update');
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.productoModule.deleteOne({ _id: id });

    if (deletedCount === 0)
      throw new BadRequestException(`Producto with id "${id}" not found`);

    return;
  }

  private handleExceptions(error: any, method: string) {
    if (error.code === 11000)
      throw new BadRequestException(`Producto exists in db ${JSON.stringify(error.keyValue)}`)

    console.log(error);

    throw new InternalServerErrorException(`Can't ${method} Producto - Check server logs`);
  }
}
