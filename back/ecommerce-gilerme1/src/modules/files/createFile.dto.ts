/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, IsUUID } from 'class-validator';

export class CreateFileDto {
    @ApiProperty({ example: 'imagen_producto.jpg' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: 'image/jpeg' })
    @IsNotEmpty()
    @IsString()
    mimeType: string;

    @ApiProperty({ example: 'https://miapp.com/uploads/imagen.jpg' })
    @IsNotEmpty()
    @IsUrl()
    url: string;

    @ApiProperty({ example: '8c774270-d689-4f24-abc0-1234a98a4adf' })
    @IsNotEmpty()
    @IsUUID()
    productId: string;
}



