import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Categoria } from "src/tienda/categoria/entities/categoria.entity";

@Schema()
export class Producto extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({
        required: true,
        default: true
    })
    state: boolean;

    @Prop({ default: 0 })
    cost: number

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' })
    categoria: Categoria;

    // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' }] })
    // categoria: Categoria[];

    description?: string;

    @Prop({
        required: true,
        default: true
    })
    available: boolean;

    img?: string;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);