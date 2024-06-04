import { Exclude } from "class-transformer";
import { IsOptional, Length, IsNumber } from "class-validator";

export class UpdateBooksDto {
    @Exclude()
    id: number;

    @IsOptional()
    @Length(3, 255)
    title?: string;

    @IsOptional()
    @Length(3)
    description?: string;

    @IsOptional()
    @IsNumber()
    price?: number;

    @IsOptional()
    @Length(3, 255)
    author?: string;

    @IsOptional()
    coverImageUrl?: string;
    
    @IsOptional()
    year?: number;
}
