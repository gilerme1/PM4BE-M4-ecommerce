/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import data from 'src/modules/Products/data_products'; 
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly service: CategoriesService) {}

    @Get()
    async getAll(@Res() res: Response) {
        try {
        const categories = await this.service.getCategories();
        return res.status(HttpStatus.OK).json(categories);
        } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: true,
            message: 'Error al obtener las categorías',
        });
        }
    }
}