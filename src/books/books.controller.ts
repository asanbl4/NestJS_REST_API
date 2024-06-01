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

@Controller('books')
@Roles(Role.Moderator)
@UseGuards(AuthGuard) // Apply guards globally to the controller
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @Roles(Role.User)
  getAllBooks() {
    return this.booksService.getAllBooks();
  }

  @Post('/create')
  @Roles(Role.User)
  @UseInterceptors(FileInterceptor('file'))
  async createBook(@Body() bookData: CreateBooksDto, @UploadedFile() file: Express.Multer.File) {
    return await this.booksService.createNewBook(bookData);
  }

  @Get(':id')
  @Roles(Role.User)
  async getBook(@Param('id') id: string) {
    const parsedId = parseInt(id, 10);
    return await this.booksService.getOneBook(parsedId);
  }

  @Patch(':id')
  async updateBook(@Body() bookData: UpdateBooksDto, @Param('id') id: string) {
    const parsedId = parseInt(id, 10);
    return await this.booksService.updateBook(parsedId, bookData);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    const parsedId = parseInt(id, 10);
    return await this.booksService.deleteBook(parsedId);
  }
  
  @Post('upload/:id')
  @Roles(Role.User)
  @UseInterceptors(
    FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: editFileName,
        })
    }),
  )
  async uploadFile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File
    ) {
        const parsedId = parseInt(id, 10);
        return await this.booksService.addImageToBook(parsedId, file.filename);
    }
}
