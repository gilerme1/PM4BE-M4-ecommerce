/* eslint-disable prettier/prettier */
import { forwardRef, Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { CategoriesModule } from "../Categories/categories.module";
import { Product } from "../../entities/product.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductsRepository } from "./products.repository";
import { FilesModule } from "../files/files.module";
import { AuthModule } from "../Auth/auth.module";

@Module({
    imports: [TypeOrmModule.forFeature([Product]), CategoriesModule, FilesModule, forwardRef(() => AuthModule)],
    controllers: [ProductsController],
    providers: [ProductsService, ProductsRepository], 
    exports: [ProductsService],
})
export class ProductsModule {}