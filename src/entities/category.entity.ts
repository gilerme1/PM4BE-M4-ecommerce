/* eslint-disable prettier/prettier */
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from 'typeorm';
import { Product } from '../entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ format: 'uuid' })
    id: string;

    @Column({ type: 'varchar', length: 50, unique: true })
    @ApiProperty()
    name: string;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];
}

