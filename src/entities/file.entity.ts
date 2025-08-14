/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'files' })
export class File {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1 })
    id: number;

    @Column()
    @ApiProperty()
    name: string;

    @Column()
    @ApiProperty()
    mimeType: string;

    @Column()
    @ApiProperty({ description: 'URL segura de Cloudinary' })
    url: string; // ← Guardás aquí el secure_url de Cloudinary
    
    // @Column({ type: 'bytea' })
    // data: Buffer;

    @ManyToOne(() => Product, (product) => product.files, {onDelete: 'CASCADE'})
    product: Product;
}
