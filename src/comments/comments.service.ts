import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comments.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from './comments.entity';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(CommentRepository)
        private commentRepository: CommentRepository,
      ) {}


      async createComment(
        userid: string,
        postId: string,
        createCommentDto): Promise<Comments> {
        const comment = new Comments();
        comment.body = createCommentDto.body;
        comment.userId = userid;
        comment.postId = postId;
        await this.commentRepository.save(comment);
        return await this.commentRepository.findOne({where:{id: comment.id}});
      }


}
