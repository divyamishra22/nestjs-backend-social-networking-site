import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { User } from 'src/user/user.entity';
import { Posts } from 'src/posts/posts.entity';
import { Likes } from './like.entity';
import { PostsService } from 'src/posts/posts.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Likes,Posts, User]), 
        // forwardRef(() => User)
      ],
      controllers: [LikeController],
      providers: [LikeService,PostsService ],
})
export class LikeModule {}