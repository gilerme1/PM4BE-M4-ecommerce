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

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false }) 
  name: string;

  @Column({ type: 'text', nullable: false }) 
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false }) 
  price: number;

  @Column({ type: 'int', nullable: false }) 
  stock: number;

  @Column({ type: 'varchar', default: 'https://via.placeholder.com/150' })
  imgUrl?: string; // Sigue siendo opcional en TS ya que tiene un default

  @ManyToOne(() => Category, (category) => category.products, { eager: true, nullable: false }) 
  category: Category;

  @OneToMany(() => File, (file) => file.product)
  files: File[];

  @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
  orderDetails: OrderDetail[];
}
