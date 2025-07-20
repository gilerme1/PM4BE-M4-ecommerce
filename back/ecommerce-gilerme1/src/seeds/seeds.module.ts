/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesSeed } from './categories/categories.seed';
import { Category } from 'src/entities/category.entity';
import { Product } from 'src/entities/product.entity';
import { ProductsSeed } from './products/products.seed';

@Module({
    imports: [TypeOrmModule.forFeature([Category, Product])],
    providers: [CategoriesSeed, ProductsSeed],
    exports: [CategoriesSeed, ProductsSeed],
})
export class SeedsModule {}
