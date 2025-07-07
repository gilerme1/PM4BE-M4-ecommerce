/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator";

class ProductOrder {
    @IsUUID()
    id: string;
}

export class CreateOrderDto {
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductOrder)
    products: ProductOrder[];
}

// Usamos @ValidateNested + @Type para validar correctamente los objetos dentro del array products.
// Cada producto es un { id: string }, por lo tanto lo encapsulamos como una clase ProductOrder.