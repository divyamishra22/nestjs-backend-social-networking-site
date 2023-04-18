import { Module, forwardRef } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './posts.entity';
import { User } from 'src/user/user.entity';
import { Likes } from 'src/like/like.entity';
import { LikeModule } from 'src/like/like.module';
import { LikeService } from 'src/like/like.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Posts, User, Likes]), 
          forwardRef(() => AuthModule),
          // AuthModule,
         LikeModule
      ],
      controllers: [PostsController],
      providers: [PostsService, LikeService],
      exports: [PostsService]
})
export class PostsModule {}
