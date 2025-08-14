/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsRepository {
    constructor(
        @InjectRepository(Product)
        private readonly repo: Repository<Product>,
    ) {}

    async findByName(name: string) {
        return this.repo.findOne({ where: { name } });
    }

    async createAndSave(productData: Partial<Product>) {
        const product = this.repo.create(productData);
        return this.repo.save(product);
    }

    async findAll(page = 1, limit = 5) {
        return this.repo.find({
        skip: (page - 1) * limit,
        take: limit,
        });
    }

    async findById(id: string) {
        return this.repo.findOne({ where: { id } });
    }

    async update(id: string, data: Partial<Product>) {
    await this.repo.update({ id }, data);
    }
}

