import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePokemonDto {
    @ApiProperty({
        example: 'bulbasaur',
        description: 'Pokemon name',
        uniqueItems: true
    })
    @IsString()
    @MinLength(1)
    name: string;

    @ApiProperty({
        example: 1,
        description: 'Pokemon Id',
        uniqueItems: true
    })
    @IsInt()
    @IsPositive()
    @Min(1)
    no: number;

    @ApiProperty({
        example: 'https://pokeapi.co/api/v2/pokemon/1/',
        description: 'Pokemon url',
        uniqueItems: true
    })
    @IsString()
    @MinLength(1)
    url: string;
}
