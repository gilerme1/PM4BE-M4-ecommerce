/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NotFoundException } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import * as toStream from 'buffer-to-stream';
import { ProductsRepository } from '../Products/products.repository';
import { FilesRepository } from './files.repository';

@Injectable()
export class FilesService {
    constructor(
        private readonly filesRepo: FilesRepository,
        private readonly productsRepo: ProductsRepository,
    ) {}

    async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream(
            { resource_type: 'auto' },
            (error, result) => {
            if (error) return reject(error);
            if (result) resolve(result);
            else reject(new Error('Cloudinary upload failed'));
            },
        );
        toStream(file.buffer).pipe(upload);
        });
    }

    async uploadProductImage(productId: string, file: Express.Multer.File) {
        const product = await this.productsRepo.findById(productId);
        if (!product) throw new NotFoundException('Producto no encontrado');

        const uploadResult = await this.uploadImage(file);

        product.imgUrl = uploadResult.secure_url;
        await this.productsRepo.update(productId, product);

        const savedFile = await this.filesRepo.saveFile({
            name: file.originalname,
            mimeType: file.mimetype,
            url: uploadResult.secure_url,
            productId,
        });

        return {
            imageUrl: uploadResult.secure_url,
            fileId: savedFile.id, 
        };
        }
}





