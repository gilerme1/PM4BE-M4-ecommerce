/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesRepository {
    constructor(
        @InjectRepository(Category)
        private readonly repo: Repository<Category>,
    ) {}

    getCategories() {
        return this.repo.find();
    }

    async addCategories(names: string[]) {
        const agregar: Category[] = [];
        for (const name of names) {
            const exists = await this.repo.findOneBy({ name });
            if (!exists) {
                const category = this.repo.create({ name });
                await this.repo.save(category);
                agregar.push(category);
            }
        }
        return { message: `${agregar.length} categorías agregadas`, agregar };
    }
}
