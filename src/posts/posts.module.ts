import { Module, forwardRef } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './posts.entity';
import { User } from 'src/user/user.entity';
import { Likes } from 'src/like/like.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Posts, User, Likes]), 
        // forwardRef(() => User)
      ],
      controllers: [PostsController],
      providers: [PostsService, ],
      exports: [PostsService]
})
export class PostsModule {}
