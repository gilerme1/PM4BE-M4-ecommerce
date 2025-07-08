/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateFileDto } from "./createFile.dto";
import { Product } from "src/entities/product.entity";
import { File } from "src/entities/file.entity";

@Injectable()
export class FilesRepository {
    constructor(
        @InjectRepository(File)
        private readonly filesRepo: Repository<File>,

        @InjectRepository(Product)
        private readonly productsRepo: Repository<Product>,
    ) {}

    async saveFile(dto: CreateFileDto): Promise<File> {
        const product = await this.productsRepo.findOne({ where: { id: dto.productId } });
        if (!product) throw new NotFoundException('Producto no encontrado');

        const file = this.filesRepo.create({
        name: dto.name,
        mimeType: dto.mimeType,
        url: dto.url,
        product,
        } as Partial<File>); 

        return this.filesRepo.save(file);
    }

    async getAllByProduct(productId: string): Promise<File[]> {
        return this.filesRepo.find({
        where: {
            product: {
            id: productId,
            } as any, 
        },
        relations: ['product'],
        });
    }
    }
