/* eslint-disable prettier/prettier */
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    ManyToMany,
    JoinTable,
    JoinColumn,
} from 'typeorm';
import { Order } from 'src/entities/order.entity';
import { Product } from 'src/entities/product.entity';

@Entity('order_details')
export class OrderDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;

    @OneToOne(() => Order, (order) => order.orderDetail, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'orderId' }) // La FK 'orderId' se crea aquí en la tabla order_details
    order: Order;

    @ManyToMany(() => Product, (product) => product.orderDetails)
    @JoinTable({
        name: 'order_details_products', // Nombre más conciso para la tabla intermedia
        joinColumn: { name: 'orderDetailId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'productId', referencedColumnName: 'id' },
    })
    products: Product[];
}
