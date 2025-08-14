/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import data from 'src/modules/Products/data_products';
import { CategoriesService } from '../Categories/categories.service'; 
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
    constructor(
        private readonly productRepo: ProductsRepository,
        private readonly categoriesService: CategoriesService,
    ) {}

    getAll(page = 1, limit = 5) {
        return this.productRepo.findAll(page, limit);
    }

    getById(id: string) {
        return this.productRepo.findById(id);
    }

    async update(id: string, data: Partial<any>) {
        await this.productRepo.update(id, data);
            return this.getById(id);
    }

    // async seedProducts() {
    //     const categories = await this.categoriesService.getCategories();
    //     const added: string[] = [];

    //     for (const item of data) {
    //         const exists = await this.productRepo.findByName(item.name);
    //         if (exists) continue;

    //         const category = categories.find((cat) => cat.name === item.category);
    //         if (!category) continue;

    //         const newProduct = {
    //             name: item.name,
    //             description: item.description,
    //             price: item.price,
    //             stock: item.stock,
    //             imgUrl: item.imgUrl || 'https://via.placeholder.com/150',
    //             category,
    //         };

    //         await this.productRepo.createAndSave(newProduct);
    //         added.push(item.name);
    //     }

    //     return { message: `${added.length} productos agregados`, added };
    // }
}

