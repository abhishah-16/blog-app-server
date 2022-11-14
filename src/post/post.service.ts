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
    const slug = createPostDto.title.split(" ").join('_').toLowerCase()

    return await this.postRepo.insert({ ...createPostDto, slug })
  }

  async findAll() {
    const posts = await this.postRepo.find()
    return posts
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
