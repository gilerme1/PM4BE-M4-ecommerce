/* eslint-disable prettier/prettier */
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToOne,
} from 'typeorm';
import { User } from 'src/entities/user.entity';
import { OrderDetail } from 'src/entities/orderDetails.entity';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date;

    @ManyToOne(() => User, (user) => user.orders, { nullable: false, onDelete: 'CASCADE' })
    user: User;

    // Eliminamos @JoinColumn() aquí para que la FK 'orderId' resida en OrderDetail
    @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order, { cascade: true })
    orderDetail: OrderDetail;
}
