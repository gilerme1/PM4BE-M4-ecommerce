/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Product } from 'src/Interfaces/product.interface';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
    constructor(private repo: ProductsRepository) {}

    getAll(page?: number, limit?: number) {
        return this.repo.getProducts(page, limit);
    }

    getById(id: number) {
        return this.repo.getById(id);
    }

    create(product: Omit<Product, 'id'>) {
        return this.repo.createProduct(product);
    }

    update(id: number, changes: Partial<Product>) {
        return this.repo.updateProduct(id, changes);
    }

    delete(id: number) {
        return this.repo.deleteProduct(id);
    }
}
