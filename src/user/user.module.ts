import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Posts } from 'src/posts/posts.entity';
import { Likes } from 'src/like/like.entity';
import { PostsModule } from 'src/posts/posts.module';
import { Follow } from 'src/follow/follow.entity';
import { AuthModule } from 'src/auth/auth.module';
import { FollowModule } from 'src/follow/follow.module';



@Module({
    imports: [
        TypeOrmModule.forFeature([User, Posts, Likes, Follow]), 
         forwardRef(() => PostsModule),
         forwardRef(() => FollowModule),
        // PostsModule
        forwardRef(() => AuthModule)
      ],
      controllers: [UserController],
      providers: [UserService, ],
      exports: [UserService, ]
})
export class UserModule {}
