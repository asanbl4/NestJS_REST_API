import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersRepository } from "./users.repository";
import { CreateUsersDto } from "./dto/CreateUsers.dto";
import { instanceToPlain } from "class-transformer";
import { User } from "./users.entity";



@Injectable()
export class UsersService {
    constructor(@InjectRepository(UsersRepository) private usersRepository: UsersRepository) {}

    async createNewUser(createUsersDto: CreateUsersDto) {
        const user = instanceToPlain(createUsersDto);
        return await this.usersRepository.save(user);
    }

    async getAllUsers(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async findOne(username: string) {
        return await this.usersRepository.findOneBy({username: username});
    }

}