import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Categoria, CategoriaSchema } from './entities/categoria.entity';

@Module({
  controllers: [CategoriaController],
  providers: [CategoriaService],
  imports: [
    MongooseModule.forFeature([{
      name: Categoria.name,
      schema: CategoriaSchema
    }], 'tienda'),
  ]
})
export class CategoriaModule { }
