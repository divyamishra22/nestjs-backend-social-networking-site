import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Posts } from 'src/posts/posts.entity';
import { Likes } from 'src/like/like.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([User, Posts, Likes]), 
        // forwardRef(() => Posts)
      ],
      controllers: [UserController],
      providers: [UserService, ],
      exports: [UserService, ]
})
export class UserModule {}
