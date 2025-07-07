/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';


@Injectable()
export class CategoriesService {
    constructor(private readonly repo: CategoriesRepository) {}

    getCategories() {
        return this.repo.getCategories();
    }

    addCategories(names: string[]) {
        return this.repo.addCategories(names);
    }
}
