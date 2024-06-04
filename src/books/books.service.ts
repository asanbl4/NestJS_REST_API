import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BooksRepository } from "./books.repository";
import { CreateBooksDto } from "./dto/CreateBooks.dto";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { Book } from "./books.entity";
import { UpdateBooksDto } from "./dto/UpdateBooks.dto";
import { extname, join } from "path";


@Injectable()
export class BooksService {
    constructor(@InjectRepository(BooksRepository) private booksRepository: BooksRepository) {}

    async createNewBook(createBooksDto: CreateBooksDto) {
        const book = instanceToPlain(createBooksDto);
        return await this.booksRepository.save(book);
    }

    async getAllBooks() {
        const books = await this.booksRepository.find();
        return books.map(book => ({
            ...book,
            coverImageUrl: book.coverImageUrl ? `http://localhost:3000/uploads/${book.coverImageUrl}` : null,
          }));
    }

    async getOneBook(id: number): Promise<Book> {
        const book = await this.findBook(id);
        if (book.coverImageUrl) {
            book.coverImageUrl = 'http://localhost:3000/uploads/${book.coverImageUrl}';
        }
        return book;
    }

    async updateBook(id: number, updateBooksDto: UpdateBooksDto) {
        const book = await this.findBook(id);

        const updatedBook = plainToInstance(Book, { ...updateBooksDto, id: book.id });

        return await this.booksRepository.save(updatedBook);
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
    
    private async addImageToBook(book: Book, fileName: string): Promise<Book> {
        book.coverImageUrl = fileName;
        return book;
    }
}