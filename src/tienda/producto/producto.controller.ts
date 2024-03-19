import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Producto } from './entities/producto.entity';

@ApiTags('Producto')
@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) { }

  @Post()
  @ApiResponse({status: 201, description: 'Producto was created', type: Producto })
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productoService.create(createProductoDto);
  }

  @Get()
  @ApiResponse({status: 200, description: 'Producto was get', type: [Producto] })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productoService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiResponse({status: 200, description: 'Producto was get by id', type: Producto })
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.productoService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({status: 200, description: 'Producto was update', type: Producto })
  update(@Param('id', ParseMongoIdPipe) id: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productoService.update(id, updateProductoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.productoService.remove(id);
  }
}
