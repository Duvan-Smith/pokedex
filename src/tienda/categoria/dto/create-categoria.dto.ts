import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateCategoriaDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    name: string;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    state: boolean;
}
