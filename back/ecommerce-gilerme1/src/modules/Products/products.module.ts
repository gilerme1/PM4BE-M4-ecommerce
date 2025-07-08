/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { CategoriesModule } from "../Categories/categories.module";
import { Product } from "src/entities/product.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductsRepository } from "./products.repository";
import { FilesModule } from "../files/files.module";

@Module({
    imports: [TypeOrmModule.forFeature([Product]), CategoriesModule, FilesModule],
    controllers: [ProductsController],
    providers: [ProductsService, ProductsRepository], 
    exports: [ProductsService],
})
export class ProductsModule {}