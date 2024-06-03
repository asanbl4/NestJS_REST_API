import { Controller, Post, Body, Get, Param, Patch, Delete, UsePipes, ValidationPipe, Logger } from "@nestjs/common";

import { Roles } from "../roles/roles.decorator";
import { Role } from "../roles/enums/roles.enums";
import { UsersService } from "./users.service";
import { CreateUsersDto } from "./dto/CreateUsers.dto";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    // can't add body to get request 
    @Get()
    @Roles(Role.Moderator, Role.User)
    getAllUsers() {
        return this.usersService.getAllUsers();
    }

    @Post()
    createUser(@Body() userData: CreateUsersDto) {
        this.usersService.createNewUser(userData);
    }
    
}