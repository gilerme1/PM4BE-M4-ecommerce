/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FilesService } from './files.service';
import { FilesRepository } from './files.repository';
import { ProductsRepository } from '../Products/products.repository';
import { NotFoundException } from '@nestjs/common';
import { UploadApiResponse } from 'cloudinary';

describe('FilesService - test de funcionalidades del servicio de files', () => {
    let service: FilesService;
    let mockFilesRepo: FilesRepository;
    let mockProductsRepo: ProductsRepository;

    beforeEach(() => {
        mockFilesRepo = {
        saveFile: async (dto) => ({ id: 'file-123', ...dto }),
        } as any;

        mockProductsRepo = {
        findById: async (id) =>
            id === 'prod-1' ? { id: 'prod-1', name: 'Producto Test' } : null,
        update: async (id, data) => true,
        } as any;

        service = new FilesService(mockFilesRepo, mockProductsRepo);
    });

    it('debería lanzar error si el producto no existe', async () => {
        await expect(service.uploadProductImage('inexistente', {} as any))
        .rejects
        .toThrow(NotFoundException);
    });

    it('debería subir imagen y guardar archivo asociado', async () => {
        const mockUploadResult: UploadApiResponse = {
        secure_url: 'http://url.com/imagen.jpg',
        } as any;

        // simulamos uploadImage
        service.uploadImage = async () => mockUploadResult;

        const mockFile = {
        originalname: 'foto.jpg',
        mimetype: 'image/jpeg',
        buffer: Buffer.from('abc'),
        } as Express.Multer.File;

        const result = await service.uploadProductImage('prod-1', mockFile);

        expect(result).toEqual({
        imageUrl: 'http://url.com/imagen.jpg',
        fileId: 'file-123',
        });
    });
});
