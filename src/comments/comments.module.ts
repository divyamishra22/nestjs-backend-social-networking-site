import { Module } from '@nestjs/common';
import { PostsModule } from 'src/posts/posts.module';
import { UserModule } from 'src/user/user.module';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from './comments.repository';
import { Comments } from './comments.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Comments]),
        PostsModule,
        UserModule,
      ],
      controllers: [CommentsController],
      providers: [CommentsService],
      exports: [CommentsService]
})
export class CommentsModule {}
