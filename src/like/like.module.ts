import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { User } from 'src/user/user.entity';
import { Posts } from 'src/posts/posts.entity';
import { Likes } from './like.entity';
import { PostsService } from 'src/posts/posts.service';
import { PostsModule } from 'src/posts/posts.module';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Likes,Posts, User]), 
         forwardRef(() => PostsModule),
        //  forwardRef(()=>UserModule)
      ],
      controllers: [LikeController],
      providers: [LikeService, ],
})
export class LikeModule {}
