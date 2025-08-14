/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Order } from '../entities/order.entity'; 
import { Role } from '../roles/roles.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ format: 'uuid' })
    id: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    @ApiProperty()
    name: string;

    @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
    @ApiProperty()
    email: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    @ApiProperty()
    password: string;

    @Column({ type: 'enum', enum: Role, default: Role.USER })
    @ApiProperty({ enum: Role })
    role: Role;

    @Column({ type: 'varchar', nullable: true })
    @ApiProperty({ required: false })
    phone: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    @ApiProperty({ required: false })
    country: string;

    @Column({ type: 'text', nullable: true })
    @ApiProperty({ required: false })
    address: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    @ApiProperty({ required: false })
    city: string;

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];
}

