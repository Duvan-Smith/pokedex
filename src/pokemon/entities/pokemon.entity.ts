import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";

@Schema()
export class Pokemon extends Document {
    @ApiProperty({
        example: 'bulbasaur',
        description: 'Pokemon name',
        uniqueItems: true
    })
    @Prop({
        unique: true,
        index: true
    })
    name: string;

    @ApiProperty({
        example: 1,
        description: 'Pokemon Id',
        uniqueItems: true
    })
    @Prop({
        unique: true,
        index: true
    })
    no: number;

    @ApiProperty({
        example: 'https://pokeapi.co/api/v2/pokemon/1/',
        description: 'Pokemon url',
        uniqueItems: true
    })
    @Prop({
        unique: true,
        index: true
    })
    url: string;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);