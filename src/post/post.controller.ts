import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
  UseGuards,
  Req,
  UploadedFile,
  BadRequestException
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { currentUserGuard } from 'src/auth/current-user.guard';
import { Express } from "express"
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('post')
@UseInterceptors(ClassSerializerInterceptor)
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  @UseGuards(currentUserGuard)
  findAll(@Query() query: any) {
    return this.postService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Get('/slug/:slug')
  findOneBySlug(@Param('slug') slug: string) {
    return this.postService.findBySlug(slug);
  }

  @Post('upload-photo')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const name = file.originalname.split('.')[0]
        const ext = file.originalname.split('.')[1]
        const newFileName = name.split(' ').join('_') + '_' + Date.now() + '.' + ext
        cb(null, newFileName)
      }
    }),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(null, false)
      }
      cb(null, true)
    }
  }))
  uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is not an image')
    } else {
      const res = {
        filepath: `http://localhost:4444/post/picture/${file.filename}`
      }
      return res
    }
  }

  @Patch(':slug')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('slug') slug: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(slug, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}