import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { User } from './users/users.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles/roles.guard';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [BooksModule, UsersModule, TypeOrmModule.forRoot(typeOrmConfig), TypeOrmModule.forFeature([User]), AuthModule],
  controllers: [AppController],
  providers: [
    AppService, 
    {
    provide: APP_GUARD,
    useClass: RolesGuard,
    }
],
})
export class AppModule {}
