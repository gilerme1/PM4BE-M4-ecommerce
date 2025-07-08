/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsUrl, IsUUID } from 'class-validator';

export class CreateFileDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    mimeType: string;

    @IsNotEmpty()
    @IsUrl()
    url: string; 

    
    @IsNotEmpty()
    @IsUUID()
    productId: string; // relación al producto
}


