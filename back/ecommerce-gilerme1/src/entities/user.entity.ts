/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Order } from '../entities/order.entity'; 
import { Role } from '../roles/roles.enum';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
    email: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    password: string;

    @Column({ type: 'enum', enum: Role, default: Role.USER })
    role: Role;

    @Column({ type: 'varchar', nullable: true })
    phone: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    country: string;

    @Column({ type: 'text', nullable: true })
    address: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    city: string;

    // Relación 1:N con Order
    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];
}
