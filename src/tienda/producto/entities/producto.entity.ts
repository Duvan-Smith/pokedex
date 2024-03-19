import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { Document } from "mongoose";
import { Categoria } from "src/tienda/categoria/entities/categoria.entity";

@Schema()
export class Producto extends Document {
    @ApiProperty({
        example: 'Arroz',
        description: 'Nombre de producto',
        required: true
    })
    @Prop({ required: true })
    name: string;

    @ApiProperty({
        example: true,
        description: 'Prodcuto eliminado',
        required: true
    })
    @Prop({
        required: true,
        default: true
    })
    state: boolean;

    @ApiProperty({
        example: '2000',
        description: 'Precio de producto'
    })
    @Prop({ default: 0 })
    cost: number

    @ApiProperty({
        example: '65f8fcd6a3f5be6e86004fb5',
        description: 'Categoria de producto'
    })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' })
    categoria: Categoria;

    // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' }] })
    // categoria: Categoria[];

    @ApiProperty({
        example: 'BBB - Bueno bonito y barato',
        description: 'Dedscripcion de producto'
    })
    description?: string;

    @ApiProperty({
        example: true,
        description: 'Disponivilidad de producto'
    })
    @Prop({
        required: true,
        default: true
    })
    available: boolean;

    @ApiProperty({
        example: 'https://rutaimagen/jpg',
        description: 'Imagen de producto'
    })
    img?: string;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);