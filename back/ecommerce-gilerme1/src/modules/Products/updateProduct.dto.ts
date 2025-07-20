/* eslint-disable prettier/prettier */
import { IsOptional, IsString, IsNumber, IsUrl, Min } from 'class-validator';

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    price?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    stock?: number;

    @IsOptional()
    @IsUrl()
    imgUrl?: string;
}

