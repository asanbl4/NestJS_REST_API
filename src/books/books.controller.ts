import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBooksDto } from './dto/CreateBooks.dto';
import { UpdateBooksDto } from './dto/UpdateBooks.dto';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/enums/roles.enums';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/utils/editFile';
import { Book } from './books.entity';


@Controller('books')
@Roles(Role.Moderator)
@UseGuards(AuthGuard, RolesGuard) // Apply guards globally to the controller
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @Roles(Role.Moderator, Role.User)
  getAllBooks() {
    return this.booksService.getAllBooks();
  }

  @Post('/create')
  @UseInterceptors(
    FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: editFileName,
        })
    }),
  )
  @Roles(Role.Moderator, Role.User)
  async createBook(@Body() bookData: CreateBooksDto, @UploadedFile() file: Express.Multer.File) {
    bookData.coverImageUrl = file.filename;
    return await this.booksService.createNewBook(bookData);
  }

  @Get('search')
  @Roles(Role.Moderator, Role.User)
  async searchBook(
    @Query('title') title?: string,
    @Query('author') author?: string,
    @Query('year') year?: number,
    @Query('description') description?: string,
  ): Promise<Book[]> {
    return this.booksService.searchBook(title, description, author, year);
  }

  @Get(':id')
  @Roles(Role.Moderator, Role.User)
  async getBook(@Param('id') id: string) {
    const parsedId = parseInt(id, 10);
    return await this.booksService.getOneBook(parsedId)
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: editFileName,
        })
    }),
  )
  async updateBook(@Body() bookData: UpdateBooksDto, @Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    const parsedId = parseInt(id, 10);
    if (file) {
      bookData.coverImageUrl = file.filename;
    }
    return await this.booksService.updateBook(parsedId, bookData);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    const parsedId = parseInt(id, 10);
    return await this.booksService.deleteBook(parsedId);
  }


}
