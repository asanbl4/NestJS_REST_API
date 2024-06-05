import { Module } from "@nestjs/common";
import { BooksController } from "./books.controller";
import { BooksService } from "./books.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BooksRepository } from "./books.repository";
import { Book } from "./books.entity";
import { QrcodeModule } from "src/qrcode/qrcode.module";
import { QrcodeService } from "src/qrcode/qrcode.service";


@Module({
    imports: [TypeOrmModule.forFeature([Book])],
    controllers: [BooksController],
    providers: [BooksService, BooksRepository, QrcodeService],
})

export class BooksModule {}