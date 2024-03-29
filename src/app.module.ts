import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';
import { ProductoModule } from './tienda/producto/producto.module';
import { CategoriaModule } from './tienda/categoria/categoria.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    PokemonModule,

    // MongooseModule.forRoot(process.env.MONGODB),

    MongooseModule.forRoot(process.env.MONGODBPOKEMON, {
      connectionName: 'pokemon',
    }),

    MongooseModule.forRoot(process.env.MONGODBTIENDA, {
      connectionName: 'tienda',
    }),

    CommonModule,

    SeedModule,

    ProductoModule,

    CategoriaModule
  ],
})
export class AppModule { }