/* eslint-disable prettier/prettier */
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToOne,
} from 'typeorm';
import { User } from '../entities/user.entity';
import { OrderDetail } from '../entities/orderDetails.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ format: 'uuid' })
    id: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @ApiProperty({ example: new Date().toISOString() })
    date: Date;

    @ManyToOne(() => User, (user) => user.orders, { nullable: false, onDelete: 'CASCADE' })
    user: User;

    @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order, { cascade: true })
    orderDetail: OrderDetail;
}