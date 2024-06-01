
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../roles/enums/roles.enums";

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.User,
      })
      role: Role;

}