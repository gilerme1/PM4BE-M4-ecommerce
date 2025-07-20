/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository, In } from 'typeorm';
import { categories } from './categories-mock';

@Injectable()
export class CategoriesSeed {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    async seed() {
        const existingCategories = await this.categoryRepository.find({
        where: { name: In(categories) },
        });

        for (const categoryName of categories) {
        if (!existingCategories.some((cat) => cat.name === categoryName)) {
            const category = this.categoryRepository.create({ name: categoryName });
            await this.categoryRepository.save(category);
        }
        }
    }
}
