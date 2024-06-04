import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// Name of the table
@Entity('books')
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
    })
    title: string;

    @Column({
        type: 'text',
    })
    description: string;

    @Column({
        type: 'numeric',
    })
    price: number;

    @Column({
        type: 'varchar'
    })
    author: 'string'

    @Column({
        type: 'varchar',
        nullable: true
    })
    coverImageUrl: string;

    @Column({
        type: 'int',
        nullable:true
    })
    year: number;
}