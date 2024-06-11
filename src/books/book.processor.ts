import { Process, Processor } from "@nestjs/bull";
import { BooksService } from "./books.service";
import { Job } from "bull";
import { CreateBooksDto } from "./dto/CreateBooks.dto";

@Processor('book')
export class BookProcessor {
    constructor(private readonly booksService: BooksService) {}

    @Process('addBooksBulk')
    async handleBulkUpload(job: Job<CreateBooksDto[]>) {
        for (const createBooksDto of job.data) {
            await this.booksService.createNewBook(createBooksDto);
        }
    }
}