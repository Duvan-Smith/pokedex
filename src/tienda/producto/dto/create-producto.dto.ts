import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MinLength, isInt } from "class-validator";
import { ObjectId } from "mongoose";

export class CreateProductoDto {
    @ApiProperty({
        example: 'Arroz',
        description: 'Nombre de producto',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    readonly name: string;

    // @ApiProperty({
    //     example: true,
    //     description: 'Prodcuto eliminado',
    //     required: true
    // })
    // @IsBoolean()
    // @IsNotEmpty()
    // state: boolean;

    @ApiProperty({
        example: '2000',
        description: 'Precio de producto'
    })
    @IsNumber()
    @IsPositive()
    @IsInt()
    readonly cost: number

    @ApiProperty({
        example: '65f8fcd6a3f5be6e86004fb5',
        description: 'Categoria de producto'
    })
    @IsNotEmpty()
    @IsMongoId()
    readonly categoria: ObjectId;

    // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' }] })
    // categoria: Categoria[];

    @ApiProperty({
        example: 'BBB - Bueno bonito y barato',
        description: 'Dedscripcion de producto',
        required: false
    })
    @IsOptional()
    readonly description?: string;

    @ApiProperty({
        example: true,
        description: 'Disponivilidad de producto'
    })
    @IsBoolean()
    @IsNotEmpty()
    readonly available: boolean;

    @ApiProperty({
        example: 'https://rutaimagen/jpg',
        description: 'Imagen de producto',
        required: false
    })
    @IsOptional()
    readonly img?: string;
}
