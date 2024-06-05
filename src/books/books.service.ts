import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BooksRepository } from "./books.repository";
import { CreateBooksDto } from "./dto/CreateBooks.dto";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { Book } from "./books.entity";
import { UpdateBooksDto } from "./dto/UpdateBooks.dto";
import { QrcodeService } from "src/qrcode/qrcode.service";


@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(BooksRepository) private booksRepository: BooksRepository,
        private readonly qrcodeService: QrcodeService
        ) {}

    async createNewBook(createBooksDto: CreateBooksDto) {
        createBooksDto.coverImageUrl = `http://localhost:3000/uploads/${createBooksDto.coverImageUrl}`
        const book = instanceToPlain(createBooksDto);
        return await this.booksRepository.save(book);
    }

    async getAllBooks() {
        const books = await this.booksRepository.find();
        return books;
    }

    async getOneBook(id: number): Promise<string> {
        const book = await this.findBook(id);
        const data = `
            title:${book.title}\n
            author:${book.author}\n
            year:${book.year}\n
            description:${book.description.substring(0, 31)}...
        `
        const qrCodeDataUrl = await this.qrcodeService.generateQrData(data);
        return `
        <div>
            <img src="${book.coverImageUrl}" alt="Book cover" />
            <br/>
            <img src="${qrCodeDataUrl}" alt="QR Code" />
        </div>
        `
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

    async findBook(id: number): Promise<Book> {
        const book = await this.booksRepository.findOneBy({id: id});
        if (!book) {
            throw new NotFoundException(`Book with id: ${id} not found in database`);
        }
        return book;
    }

    async searchBook(title?: string, description?: string, author?: string, year?: number) {
        const query = this.booksRepository.createQueryBuilder('books')

        if (title) {
            query.andWhere('books.title ILIKE :title', { title: `%${title}%` });
        }
        if (description) {
            query.andWhere('books.description ILIKE :description', { description: `%${description}%` });
        }
        if (author) {
            query.andWhere('books.author ILIKE :author', { author: `%${author}%` });
        }
        if (year) {
            query.andWhere('books.year = :year', { year });
        }
        return query.getMany()
     }
}