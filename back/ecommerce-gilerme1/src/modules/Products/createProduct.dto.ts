/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsUUID, IsUrl, Min, MaxLength } from 'class-validator';

export class CreateProductDto {
    @ApiProperty({ example: 'Auriculares Bluetooth' })
    @IsString()
    @MaxLength(100)
    name: string;

    @ApiProperty({ example: 'Auriculares con cancelación de ruido' })
    @IsString()
    @MaxLength(300)
    description: string;

    @ApiProperty({ example: 99.99 })
    @IsNumber()
    @Min(0)
    price: number;

    @ApiProperty({ example: 100 })
    @IsNumber()
    @Min(0)
    stock: number;

    @ApiProperty({ example: 'https://miapp.com/img.jpg', required: false })
    @IsOptional()
    @IsUrl()
    imgUrl?: string;

    @ApiProperty({ example: '6b857d72-1b9e-4a33-92e8-0a1c59f4d938' })
    @IsUUID()
    categoryId: string;
}
