import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PostModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      database: 'blog_api',
      username: 'abhi',
      password: 'Abhishah@169',
      port: 3306,
      autoLoadEntities: true,
      synchronize: true,
      logging: true
    }),
    CategoryModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
