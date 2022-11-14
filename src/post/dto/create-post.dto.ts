import {
    IsNotEmpty,
    IsOptional,
    IsString
} from "class-validator"
import { Category } from "src/category/entities/category.entity"

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    content: string

    @IsOptional()
    @IsString()
    mainImageUrl: string

    @IsOptional()
    category: Category
}
