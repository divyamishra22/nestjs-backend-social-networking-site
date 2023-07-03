import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { PostsModule } from './posts/posts.module';
import { Posts } from './posts/posts.entity';
import { LikeModule } from './like/like.module';
import { Likes } from './like/like.entity';
import { AuthModule } from './auth/auth.module';
import { FollowModule } from './follow/follow.module';
import { Follow } from './follow/follow.entity';
import { FeedModule } from './feed/feed.module';
// import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CommentsModule } from './comments/comments.module';
import { Comments } from './comments/comments.entity';




require('dotenv').config()

const db_options={

  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD ,
  database: process.env.DB_NAME ,

}

console.log(db_options)


@Module({
  imports: [
    TypeOrmModule.forRoot({
      // type: 'postgres',
      // //host: 'localhost',
      // //
      // port: 5432,
      // username: 'postgres',
      // password: 'divya123',
      // database: 'mydb1',
      // entities: [User, Posts, Likes, Follow, Comments],
      // synchronize: true,
      // logger:'advanced-console',
      // logging: 'all',  

    type: 'postgres' ,
    ...db_options,
      entities: [User, Posts, Likes, Follow, Comments],
      synchronize: true,
     
  
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
