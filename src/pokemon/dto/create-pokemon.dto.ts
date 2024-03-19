import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePokemonDto {
    @ApiProperty()
    @IsString()
    @MinLength(1)
    name: string;

    @ApiProperty()
    @IsInt()
    @IsPositive()
    @Min(1)
    no: number;
}
