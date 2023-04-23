import { Module, forwardRef } from '@nestjs/common';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from './follow.entity';
import { Posts } from 'src/posts/posts.entity';
import { User } from 'src/user/user.entity';
import { Likes } from 'src/like/like.entity';
import { UserModule } from 'src/user/user.module';
import { FollowRepository } from './follow.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([ Follow, User]), 
         forwardRef(() => UserModule)
        // UserModule
      ],
      controllers: [FollowController],
      providers: [FollowService,],
       exports: [FollowService]
})
export class FollowModule {}
