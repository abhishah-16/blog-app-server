import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {

  constructor(@InjectRepository(Category) private readonly categoryRepo: Repository<Category>) { }

  async create(createCategoryDto: CreateCategoryDto) {
    console.log(createCategoryDto);
    const category = new Category()
    Object.assign(category, createCategoryDto)
    this.categoryRepo.create(category)
    return await this.categoryRepo.save(category)
  }

  async findAll() {
    const categories = await this.categoryRepo.find()
    return categories
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findBy({ id })
    if (!category) {
      throw new BadRequestException('Category not found')
    }
    return category
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryRepo.update(id, updateCategoryDto)
  }

  async remove(id: number) {
    return await this.categoryRepo.delete(id)
  }
}
