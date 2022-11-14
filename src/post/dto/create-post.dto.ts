import {
    IsNotEmpty,
    IsOptional,
    IsString
} from "class-validator"
import { Category } from "src/category/entities/category.entity"

export class CreatePostDto {
    @IsNotEmpty({message:'Please Enter Title'})
    @IsString()
    title: string

    @IsNotEmpty({message:'Please Enter Content'})
    @IsString()
    content: string

    @IsOptional()
    @IsString()
    mainImageUrl: string

    @IsOptional()
    category: Category
}
