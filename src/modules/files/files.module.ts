/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { CloudinaryConfig } from '../../config/cloudinary';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesController } from './files.controller';
import { Product } from '../../entities/product.entity';
import { ProductsRepository } from '../Products/products.repository';
import { File } from '../../entities/file.entity';
import { FilesRepository } from './files.repository'; 
import { AuthModule } from '../Auth/auth.module';

@Module({
    imports: [ TypeOrmModule.forFeature([Product, File]), forwardRef(() => AuthModule),],   // Importamos Product para repositorio
    controllers: [FilesController],
    providers: [ CloudinaryConfig, FilesService, FilesRepository ,ProductsRepository ],
    exports: [FilesService],
})
export class FilesModule {}
