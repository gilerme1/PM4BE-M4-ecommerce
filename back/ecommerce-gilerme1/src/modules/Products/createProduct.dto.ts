/* eslint-disable prettier/prettier */
import { IsString, IsNumber, IsOptional, IsUUID, IsUrl, Min, MaxLength } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @MaxLength(100)
    name: string;

    @IsString()
    @MaxLength(300)
    description: string;

    @IsNumber()
    @Min(0)
    price: number;

    @IsNumber()
    @Min(0)
    stock: number;

    @IsOptional()
    @IsUrl()
    imgUrl?: string;

    @IsUUID()
    categoryId: string;
}
