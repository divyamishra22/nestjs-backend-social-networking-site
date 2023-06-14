import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';
import { PostsModule } from './posts/posts.module';
import { Posts } from './posts/posts.entity';
import { LikeController } from './like/like.controller';
import { LikeService } from './like/like.service';
import { LikeModule } from './like/like.module';
import { Likes } from './like/like.entity';
// import { Like } from 'typeorm';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { FollowController } from './follow/follow.controller';
import { FollowService } from './follow/follow.service';
import { FollowModule } from './follow/follow.module';
import { Follow } from './follow/follow.entity';
import { FeedService } from './feed/feed.service';
import { FeedController } from './feed/feed.controller';
import { FeedModule } from './feed/feed.module';
// import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CommentsController } from './comments/comments.controller';
import { CommentsService } from './comments/comments.service';
import { CommentsModule } from './comments/comments.module';
import { Comments } from './comments/comments.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      //host: 'localhost',
      //
      port: 5432,
      username: 'postgres',
      password: 'divya123',
      database: 'mydb1',
      entities: [User, Posts, Likes, Follow, Comments],
      synchronize: true,
      logger:'advanced-console',
      logging: 'all',  
    }),
    UserModule,
    PostsModule,
    LikeModule,
    AuthModule,
    FollowModule,
    FeedModule,
    CommentsModule,
    // CloudinaryModule
  ],
  controllers: [AppController,  ],
  providers: [AppService, ],
})
export class AppModule {}
