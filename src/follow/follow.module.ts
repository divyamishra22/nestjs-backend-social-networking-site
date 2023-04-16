import { Module } from '@nestjs/common';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from './follow.entity';
import { Posts } from 'src/posts/posts.entity';
import { User } from 'src/user/user.entity';
import { Likes } from 'src/like/like.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ Follow, User]), 
        // forwardRef(() => User)
        
      ],
      controllers: [FollowController],
      providers: [FollowService,],
      exports: [FollowService]
})
export class FollowModule {}
