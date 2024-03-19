import { IsBoolean, IsInt, IsMongoId, IsNotEmpty, IsNumber, IsPositive, IsString, MinLength, isInt } from "class-validator";
import { ObjectId } from "mongoose";
import { Categoria } from "src/tienda/categoria/entities/categoria.entity";

export class CreateProductoDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    name: string;

    @IsBoolean()
    @IsNotEmpty()
    state: boolean;

    @IsNumber()
    @IsPositive()
    @IsInt()
    cost: number

    @IsNotEmpty()
    @IsMongoId()
    categoria: ObjectId;

    // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' }] })
    // categoria: Categoria[];

    description?: string;

    @IsBoolean()
    @IsNotEmpty()
    available: boolean;

    img?: string;
}
