import { DataSource, Entity, Repository } from "typeorm";
import { Book } from "./books.entity";
import { Injectable } from "@nestjs/common";
import { CreateBooksDto } from "./dto/CreateBooks.dto";

@Injectable()
export class BooksRepository extends Repository<Book> {
    constructor(private dataSource: DataSource) {
        super(Book, dataSource.createEntityManager());
      }
            async createBook({ title, description, price, author }: CreateBooksDto) {}
      }