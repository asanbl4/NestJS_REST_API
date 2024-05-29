import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BooksRepository } from "./books.repository";
import { CreateBooksDto } from "./dto/CreateBooks.dto";
import { instanceToPlain } from "class-transformer";
import { Book } from "./books.entity";


@Injectable()
export class BooksService {
    constructor(@InjectRepository(BooksRepository) private booksRepository: BooksRepository) {}

    async createNewBook(createBooksDto: CreateBooksDto) {
        const book = instanceToPlain(createBooksDto);
        return await this.booksRepository.save(book);
    }

    async getAllBooks(): Promise<Book[]> {
        return await this.booksRepository.find();
    }

    async getOneBook(id: number): Promise<Book> {
        return this.findBook(id);
    }

    async updateBook(id: number, updateBooksDto: CreateBooksDto) {
        const book = await this.findBook(id);
        Object.assign(book, updateBooksDto);
        return await this.booksRepository.save(book);
    }

    async deleteBook(id: number) {
        const book = await this.findBook(id);
        return await this.booksRepository.remove(book);
    }

    private async findBook(id: number): Promise<Book> {
        const book = await this.booksRepository.findOneBy({id: id});
        if (!book) {
            throw new NotFoundException(`Book with id: ${id} not found in database`);
        }
        return book;
    }

}