/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Res, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ProductsService } from "./products.service";
import { Product } from "src/Interfaces/product.interface";
import { AuthGuard } from 'src/guards/auth.guards';

@Controller('products')
export class ProductsController {
    constructor(private readonly service: ProductsService) {}

    @Get()
    getProducts(
        @Query('page') page = '1',
        @Query('limit') limit = '5',
        @Res() res: Response,
    ) {
        const list = this.service.getAll(+page, +limit);
        return res.status(HttpStatus.OK).json(list);
    }

    @Get(':id')
    getById(@Param('id') id: string, @Res() res: Response) {
        const product = this.service.getById(+id);
        if (!product)
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'Not found' });
        return res.status(HttpStatus.OK).json(product);
    }

    @Post()
    @UseGuards(AuthGuard)
    createProduct(@Body() body: Product, @Res() res: Response) {
        const valid =
        body.name &&
        body.description &&
        typeof body.price === 'number' &&
        typeof body.stock === 'boolean' &&
        body.imgUrl;

        if (!valid)
        return res
            .status(HttpStatus.BAD_REQUEST)
            .json({ message: 'Estructura inválida' });

        const id = this.service.create(body);
        return res.status(HttpStatus.CREATED).json({ id });
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    updateProduct(
        @Param('id') id: string,
        @Body() body: Partial<Product>,
        @Res() res: Response,
    ) {
        const updatedId = this.service.update(+id, body);
        if (!updatedId)
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'No existe' });
        return res.status(HttpStatus.OK).json({ id: updatedId });
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteProduct(@Param('id') id: string, @Res() res: Response) {
        const deletedId = this.service.delete(+id);
        if (!deletedId)
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'No existe' });
        return res.status(HttpStatus.OK).json({ id: deletedId });
    }
}