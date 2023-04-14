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
      entities: [User, Posts, Likes],
      synchronize: true,
      logger:'advanced-console',
      logging: 'all',  
    }),
    UserModule,
    PostsModule,
    LikeModule],
  controllers: [AppController, LikeController ],
  providers: [AppService, LikeService, ],
})
export class AppModule {}
