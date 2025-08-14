/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { productsMock } from './products-mock';
import { Product } from '../../entities/product.entity';
import { Category } from '../../entities/category.entity';

@Injectable()
export class ProductsSeed {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,

        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    private async findCategoryByName(categoryName: string): Promise<Category> {
        const foundCategory = await this.categoryRepository.findOne({
        where: { name: categoryName },
        });

        if (!foundCategory) {
        throw new Error(`Category '${categoryName}' not found`);
        }

        return foundCategory;
    }

    async seed() {
        const existingProductNames = (await this.productRepository.find()).map(
        (product) => product.name,
        );

        for (const productData of productsMock) {
        if (!existingProductNames.includes(productData.name)) {
            const category = await this.findCategoryByName(productData.category);

            const product = this.productRepository.create({
            name: productData.name,
            description: productData.description,
            price: productData.price,
            stock: productData.stock,
            category,
            });

            await this.productRepository.save(product);
        }
        }
    }
}
