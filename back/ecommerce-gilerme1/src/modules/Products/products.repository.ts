/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Product } from 'src/Interfaces/product.interface';

@Injectable()
export class ProductsRepository {
    private products: Product[] = [
        {
        id: 1,
        name: 'Smartphone X',
        description: 'Latest model with advanced features.',
        price: 799.99,
        stock: true,
        imgUrl: 'https://example.com/smartphone-x.jpg',
        },
        {
        id: 2,
        name: 'Laptop Pro',
        description: 'Powerful laptop for professionals.',
        price: 1299.0,
        stock: true,
        imgUrl: 'https://example.com/laptop-pro.jpg',
        },
        // ... podés agregar más mock data
    ];

    private nextId = 3;

    getProducts(page = 1, limit = 5) {
        const start = (page - 1) * limit;
        const end = start + limit;
        return this.products.slice(start, end);
    }

    getById(id: number) {
        return this.products.find(p => p.id === id);
    }

    createProduct(product: Omit<Product, 'id'>): number {
        const newProduct = { id: this.nextId++, ...product };
        this.products.push(newProduct);
        return newProduct.id;
    }

    updateProduct(id: number, changes: Partial<Product>): number | null {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) return null;
        this.products[index] = { ...this.products[index], ...changes };
        return id;
    }

    deleteProduct(id: number): number | null {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) return null;
        this.products.splice(index, 1);
        return id;
    }
}
