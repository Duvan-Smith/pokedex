import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsMongoId, IsNotEmpty, IsNumber, IsPositive, IsString, MinLength, isInt } from "class-validator";
import { ObjectId } from "mongoose";
import { Categoria } from "src/tienda/categoria/entities/categoria.entity";

export class CreateProductoDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    name: string;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    state: boolean;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    @IsInt()
    cost: number

    @ApiProperty()
    @IsNotEmpty()
    @IsMongoId()
    categoria: ObjectId;

    // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' }] })
    // categoria: Categoria[];

    @ApiProperty()
    description?: string;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    available: boolean;

    @ApiProperty()
    img?: string;
}
