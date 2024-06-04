import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, Length } from "class-validator";

export class CreateBooksDto {
    @IsNotEmpty({message: "Book should have a title"})
    @Length(3, 255)
    title: string;
 
    @IsNotEmpty()
    @Length(3)
    description: string;

    @IsNotEmpty({message: "Book should have a price"})
    @Type(() => Number)
    price: number;

    @IsNotEmpty({message: "Book should have an author"})
    author: string;

    @IsOptional()
    coverImageUrl?: string;
    
    @IsNotEmpty()
    year: number;

}