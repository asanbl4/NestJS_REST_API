import { DataSource, Entity, Repository } from "typeorm";

import { User } from "./users.entity";
import { Injectable } from "@nestjs/common";
import { CreateUsersDto } from "./dto/CreateUsers.dto";

@Injectable()
export class UsersRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
      }
            async createUser({ username, password, role}: CreateUsersDto) {}
      }