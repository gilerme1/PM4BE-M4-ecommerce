/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator";

class ProductOrder {
    @ApiProperty({ example: 'a3e77512-b34d-4e88-9937-abcdef123456' })
    @IsUUID()
    id: string;
}

export class CreateOrderDto {
    @ApiProperty({ example: '5c7a9e4e-529e-4a4b-80e3-efb512f3c3b1' })
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @ApiProperty({
        type: [ProductOrder],
        example: [{ id: 'a3e77512-b34d-4e88-9937-abcdef123456' }],
    })
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductOrder)
    products: ProductOrder[];
}


// Usamos @ValidateNested + @Type para validar correctamente los objetos dentro del array products.
// Cada producto es un { id: string }, por lo tanto lo encapsulamos como una clase ProductOrder.