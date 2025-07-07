/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Param, Query, Res, HttpStatus, ParseUUIDPipe, BadRequestException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Response } from 'express';

@Controller('products')
export class ProductsController {
    constructor(private readonly service: ProductsService) {}

    // Pre-carga productos, asociándolos a las categorías ya creadas
    @Get('seeder')
    async seed(@Res() res: Response) {
        try {
        const result = await this.service.seedProducts();
        return res.status(HttpStatus.CREATED).json(result);
        } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: true,
            message: 'Error al ejecutar el seeder de productos',
        });
        }
    }

    // GET con paginación
    @Get()
    async getAll(
        @Query('page') page = '1',
        @Query('limit') limit = '5',
        @Res() res: Response,
    ) {
        try {
        const data = await this.service.getAll(+page, +limit);
        return res.status(HttpStatus.OK).json(data);
        } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: true,
            message: 'No se pudieron obtener los productos',
        });
        }
    }

     // GET by ID con validación de UUID y error personalizado
    @Get(':id')
    async getById(
        @Param(
                    'id', 
                    new ParseUUIDPipe({
                        exceptionFactory: () =>
                            new BadRequestException({
                            error: true,
                            message: 'Error de validación: UUID de producto NO válido',
                            }),
                        }),
                    )
                    id: string,
                    @Res() res: Response, ) {
        try {
        const product = await this.service.getById(id);
        if (!product) {
            return res.status(HttpStatus.NOT_FOUND).json({
            error: true,
            message: `No existe el producto con UUID: ${id}`,
            });
        }
        return res.status(HttpStatus.OK).json(product);
        } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: true,
            message: `Error al buscar el producto con id ${id}`,
        });
        }
    }
}

