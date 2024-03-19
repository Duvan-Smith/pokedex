import { IsBoolean, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateCategoriaDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    name: string;

    @IsBoolean()
    @IsNotEmpty()
    state: boolean;
}
