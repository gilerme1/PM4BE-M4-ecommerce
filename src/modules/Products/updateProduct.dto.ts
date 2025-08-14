/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsUrl, Min } from 'class-validator';

export class UpdateProductDto {
    @ApiProperty({ example: 'Auriculares Bluetooth', required: false })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ example: 'Auriculares con cancelación de ruido', required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ example: 99.99, required: false })
    @IsOptional()
    @IsNumber()
    @Min(0)
    price?: number;

    @ApiProperty({ example: 100, required: false })
    @IsOptional()
    @IsNumber()
    @Min(0)
    stock?: number;

    @ApiProperty({ example: 'https://miapp.com/img.jpg', required: false })
    @IsOptional()
    @IsUrl()
    imgUrl?: string;
}


