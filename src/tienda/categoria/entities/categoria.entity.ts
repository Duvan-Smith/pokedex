import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Categoria extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({
        required: true,
        default: true
    })
    state: boolean;
}

export const CategoriaSchema = SchemaFactory.createForClass(Categoria);