/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// import { InjectRepository } from "@nestjs/typeorm";
// import { Repository } from "typeorm";
// import { Product } from "src/entities/product.entity";
// import { OrderDetail } from "src/entities/orderDetails.entity";
// import { User } from "src/entities/user.entity";
import { CreateOrderDto } from "./createOrder.dto";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { OrdersRepository } from "./orders.repository";

@Injectable()
export class OrdersService {
    constructor(
        private readonly repo: OrdersRepository,
        // @InjectRepository(User) private userRepo: Repository<User>,
        // @InjectRepository(Product) private productRepo: Repository<Product>,
        // @InjectRepository(OrderDetail) private detailRepo: Repository<OrderDetail>
    ) {}

    async addOrder(dto: CreateOrderDto) {
        try {
            return await this.repo.addOrder(dto);
        } catch (error) {
            console.error('Error en addOrder:', error.message || error);
            throw new InternalServerErrorException(error.message || 'Error interno');
            }
        }

    async getOrder(id: string) {
        return this.repo.getOrder(id);
    }
}
