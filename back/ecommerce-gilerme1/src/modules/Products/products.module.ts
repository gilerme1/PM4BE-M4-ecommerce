/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { CategoriesModule } from "../Categories/categories.module";
import { Product } from "src/entities/product.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductsRepository } from "./products.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Product]), CategoriesModule],
    controllers: [ProductsController],
    providers: [ProductsService, ProductsRepository], 
})
export class ProductsModule {}