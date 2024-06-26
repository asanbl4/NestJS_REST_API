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
import { AuthGuard } from './auth/auth.guard';
import { QrcodeModule } from './qrcode/qrcode.module';
import { BullModule } from '@nestjs/bull';
import { BookProcessor } from './books/book.processor';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host:'localhost',
        port: 6379,
      }
    }),
    // BullModule.registerQueue({
    //   name: 'book',
    // }),
    BooksModule,
    UsersModule, 
    TypeOrmModule.forRoot(typeOrmConfig), 
    TypeOrmModule.forFeature([User]), 
    AuthModule, 
    QrcodeModule
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    // BookProcessor,
  ],
})
export class AppModule {}
