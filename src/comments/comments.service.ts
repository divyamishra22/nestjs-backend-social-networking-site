import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CommentRepository } from './comments.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from './comments.entity';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comments)
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


      async getCommentById(id: string): Promise<Comments> {
        const comment = await this.commentRepository.findOne({where:{id: id}});
        if (!comment) {
          throw new NotFoundException('Comment not Found');
        }
        return comment;
      }
    
      async deleteComment(comment: Comments, userId: string): Promise<any> {
        if (comment.userId !== userId) {
          throw new UnauthorizedException('Unauthorized');
        }
        return this.commentRepository.delete({id: comment.id});
      }


}
