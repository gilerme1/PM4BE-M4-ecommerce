/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Category } from '../entities/category.entity';
import { OrderDetail } from '../entities/orderDetails.entity'; 
import { File } from './file.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ format: 'uuid' })
    id: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    @ApiProperty()
    name: string;

    @Column({ type: 'text', nullable: false })
    @ApiProperty()
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    @ApiProperty({ example: 19.99 })
    price: number;

    @Column({ type: 'int', nullable: false })
    @ApiProperty({ example: 100 })
    stock: number;

    @Column({ type: 'varchar', default: 'https://via.placeholder.com/150' })
    @ApiProperty({ required: false })
    imgUrl?: string;

    @ManyToOne(() => Category, (category) => category.products, { eager: true, nullable: false })
    category: Category;

    @OneToMany(() => File, (file) => file.product)
    files: File[];

    @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
    orderDetails: OrderDetail[];
}
