/* eslint-disable prettier/prettier */
// src/modules/Orders/orders.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './order.service';
import { Order } from 'src/entities/order.entity';
import { OrderDetail } from 'src/entities/orderDetails.entity';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';
import { ProductsModule } from '../Products/products.module'; 
import { OrdersRepository } from './orders.repository';
import { AuthModule } from '../Auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Order, OrderDetail, Product, User]),
        ProductsModule, forwardRef(() => AuthModule)
    ],
    controllers: [OrdersController],
    providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
