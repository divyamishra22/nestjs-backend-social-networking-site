import { Module, forwardRef } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeModule } from 'src/like/like.module';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        // TypeOrmModule.forFeature([Posts, User, Likes]), 
        //   forwardRef(() => AuthModule, ),
          // AuthModule,
          forwardRef(()=>LikeModule),
          forwardRef(()=>UserModule)
      ],
      controllers: [FeedController],
      providers: [FeedService, ],
//       exports: [PostsService]
 })

export class FeedModule {}
