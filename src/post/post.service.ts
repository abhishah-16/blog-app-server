import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {

  constructor(@InjectRepository(Post) private readonly postRepo: Repository<Post>) { }

  async create(createPostDto: CreatePostDto) {
    const post = new Post()
    Object.assign(post, createPostDto)
    this.postRepo.create(post)
    return await this.postRepo.save(post)
  }

  async findAll(query?: string) {
    console.log(query);
    const myquery =
      this.postRepo.createQueryBuilder("post")
        .leftJoinAndSelect("post.category", "category")
        .leftJoinAndSelect("post.user", "user")

    if (!(Object.keys(query).length == 0) && query.constructor == Object) {
      const queryKeys = Object.keys(query)

      if (queryKeys.includes('title')) {
        myquery.where('post.title LIKE :title', { title: `%${query['title']}%` })
      }

      if (queryKeys.includes('sort')) {
        myquery.orderBy('post.title', query['sort'].toUpperCase())
      }

      if (queryKeys.includes('category')) {
        myquery.andWhere('category.title = :cat', { cat: query['category'] })
      }

      return await myquery.getMany()

    } else {
      return await myquery.getMany()
    }
  }

  async findOne(id: number) {
    const post = await this.postRepo.findOneBy({ id })
    if (!post) {
      throw new BadRequestException('Post not found')
    }
    return post
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    if (updatePostDto.title) {
      const slug = updatePostDto.title.split(" ").join('_').toLowerCase()
      return await this.postRepo.update(id, { ...updatePostDto, slug })
    } else {
      return await this.postRepo.update(id, updatePostDto)
    }
  }

  async remove(id: number) {
    return await this.postRepo.delete(id)
  }
}
