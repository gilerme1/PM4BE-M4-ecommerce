/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "src/entities/order.entity";
import { OrderDetail } from "src/entities/orderDetails.entity";
import { Product } from "src/entities/product.entity";
import { User } from "src/entities/user.entity";
import { In, Repository } from "typeorm";
import { CreateOrderDto } from "./createOrder.dto";

@Injectable()
export class OrdersRepository {
    constructor(
        @InjectRepository(Order) private orderRepo: Repository<Order>,
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Product) private productRepo: Repository<Product>,
        @InjectRepository(OrderDetail) private detailRepo: Repository<OrderDetail>
    ) {}

    async addOrder(dto: CreateOrderDto) {
        // Se valida el user
        const user = await this.userRepo.findOne({ where: { id: dto.userId } });
        if (!user) throw new Error('Usuario no encontrado');

        // Se crea la orden sin detalle aún
        const order = this.orderRepo.create({ user });
        await this.orderRepo.save(order);

        // Se buscan los productos y se actualiza su stock
        const productIds = dto.products.map((prod) => prod.id);
        const products = await this.productRepo.find({
            where: { id: In(productIds) },
        });

        const productosDisponibles = products.filter((prod) => prod.stock > 0);

        if (!productosDisponibles.length) {
            throw new Error('No hay productos con stock disponible');
        }
        let total = 0;

        // actualiza stock y guarda
        for (const product of productosDisponibles) {
        product.stock -= 1;
        total += Number(product.price);
        await this.productRepo.save(product);
        }

        // Se crea el OrderDetail con los productos y la orden vinculada
        const orderDetail = this.detailRepo.create({ price: total, products: productosDisponibles, order });
        await this.detailRepo.save(orderDetail);

        // Vincula el detalle a la orden y vuelve a guardar
        order.orderDetail = orderDetail;
        await this.orderRepo.save(order);

        return {
        orderId: order.id,
        detailId: orderDetail.id,
        total,
        products: productosDisponibles.map(p => p.name),
        };
    }

    async getOrder(id: string) {
        return this.orderRepo.findOne({
        where: { id },
        relations: ['orderDetail', 'orderDetail.products', 'user'],
        });
    }
}
