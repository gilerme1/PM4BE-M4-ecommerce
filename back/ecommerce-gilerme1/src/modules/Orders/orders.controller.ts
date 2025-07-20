/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response } from 'express';
import { BadRequestException, Body, Controller, Get, HttpStatus, Param, ParseUUIDPipe, Post, Res, UseGuards } from "@nestjs/common";
import { OrdersService } from "./order.service";
import { CreateOrderDto } from "./createOrder.dto";
import { AuthGuard } from '../../guards/auth.guards';

@Controller('orders')
export class OrdersController {
    constructor(private readonly service: OrdersService) {}

    @UseGuards(AuthGuard)
    @Post()
    async createOrder(@Body() body: CreateOrderDto, @Res() res: Response) {
        try {
        const result = await this.service.addOrder(body);
        return res.status(HttpStatus.CREATED).json(result);
        } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: true,
            message: 'Error al crear la orden',
        });
        }
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getOrder(
        @Param(
        'id',
        new ParseUUIDPipe({
        exceptionFactory: () =>
            new BadRequestException({
            error: true,
            message: 'Error de validación: UUID de orden NO válido',
            }),
        }),
        )
        id: string,
        @Res() res: Response,
    ) {
        try {
        const result = await this.service.getOrder(id);
        if (!result) {
            return res.status(HttpStatus.NOT_FOUND).json({
                error: true,
                message: `No existe la orden con UUID: ${id}`,
            });
        }
        return res.status(HttpStatus.OK).json(result);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: true,
                message: `Error al obtener la orden con id: ${id}`,
            });
        }
    }
}
