/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { CloudinaryConfig } from '../../config/cloudinary';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesController } from './files.controller';
import { Product } from 'src/entities/product.entity';
import { ProductsRepository } from '../Products/products.repository';
import { File } from 'src/entities/file.entity';
import { FilesRepository } from './files.repository'; 

@Module({
    imports: [ TypeOrmModule.forFeature([Product, File]) ],   // Importamos Product para repositorio
    controllers: [FilesController],
    providers: [ CloudinaryConfig, FilesService, FilesRepository ,ProductsRepository ],
    exports: [FilesService],
})
export class FilesModule {}
