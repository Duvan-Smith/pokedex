import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";

@Schema()
export class Categoria extends Document {
    @ApiProperty()
    @Prop({ required: true })
    name: string;

    @ApiProperty()
    @Prop({
        required: true,
        default: true
    })
    state: boolean;
}

export const CategoriaSchema = SchemaFactory.createForClass(Categoria);