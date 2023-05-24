import { Module, forwardRef } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeModule } from 'src/like/like.module';
import { UserModule } from 'src/user/user.module';
import { PostsModule } from 'src/posts/posts.module';
import { LikeService } from 'src/like/like.service';
import { Likes } from 'src/like/like.entity';

@Module({
    imports: [
        // TypeOrmModule.forFeature([ Likes]), 
        //   forwardRef(() => AuthModule, ),
           
          forwardRef(()=>PostsModule),
          forwardRef(()=>UserModule),
          forwardRef(()=>LikeModule),

      ],
      controllers: [FeedController],
      providers: [FeedService, ],
//       exports: [PostsService]
 })

export class FeedModule {}
