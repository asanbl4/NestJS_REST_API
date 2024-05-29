import { Controller, Post, Body, Get, Param, Patch, Delete, UsePipes, ValidationPipe } from "@nestjs/common";
import { BooksService } from "./books.service";
import { CreateBooksDto } from "./dto/CreateBooks.dto";

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}
    // can't add body to get request 
    @Get()
    getAllBooks() {
        return this.booksService.getAllBooks();
    }

    @Post('/create')
    @UsePipes(ValidationPipe)
    async createBook(@Body() bookData: CreateBooksDto) {
        return await this.booksService.createNewBook(bookData);
    }
    
    @Get(':id') 
    async getBook(@Param('id') id: string) {
        const parsedId = parseInt(id, 10);
        return await this.booksService.getOneBook(parsedId);
    }

    @Patch(':id')
    async updateBook(@Body() bookData: CreateBooksDto, @Param('id') id: string) {
        if ('id' in bookData) {
            delete bookData.id;
        }
        const parsedId = parseInt(id, 10);
        return await this.booksService.updateBook(parsedId, bookData);
    }

    @Delete(':id')
    async deleteBook(@Param('id') id: string) {
        const parsedId = parseInt(id, 10);
        return await this.booksService.deleteBook(parsedId);
    }

}