/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity({ name: 'files' })
export class File {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    mimeType: string;

    @Column()
    url: string; // ← Guardás aquí el secure_url de Cloudinary
    
    // @Column({ type: 'bytea' })
    // data: Buffer;

    @ManyToOne(() => Product, (product) => product.files, {onDelete: 'CASCADE'})
    product: Product;
}
