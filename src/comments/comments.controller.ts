import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { PostsService } from 'src/posts/posts.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { getUserbyId } from 'src/auth/auth.decorator';
import { IsNotEmpty, MinLength } from 'class-validator';
import { Comments } from './comments.entity';


 class CreateCommentDto {
    @IsNotEmpty()
    @MinLength(5)
    body: string;
  }

  

@Controller('comments')
export class CommentsController {
    constructor(
        private commentService: CommentsService,
        private postService: PostsService,
      ) {}


    @Post('/:postId')
//   @UsePipes(ValidationPipe)
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async createComment(
    @getUserbyId() userid:string,
    @Body() createCommentDto: CreateCommentDto,
    @Param('postId') postId: string,
  ): Promise<Comments> {
    await this.postService.getPostByPostId(postId);

    return await this.commentService.createComment(
      userid,
      postId,
      createCommentDto,
    );
  }


  @Delete('/:commentId')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async deleteComment(
    @getUserbyId() userid: string,
    @Param('commentId') commentId: string,) {
    const comment = await this.commentService.getCommentById(commentId);

    return this.commentService.deleteComment(comment, userid);
  }


}
