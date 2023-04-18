import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { PostsService } from 'src/posts/posts.service';
import { User } from 'src/user/user.entity';
import { getUserbyId } from 'src/auth/auth.decorator';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';





@ApiTags('likes')
@Controller('like')
export class LikeController {
  constructor(private likeService: LikeService,
    private postService: PostsService,) {}

  @Post('/:id')
  async handleLike(@Param('id') id: string, @getUserbyId() userid: string ) {
    const photo = await this.postService.getPostByPostId(id);

    const like = await this.likeService.findLikeByUserAndPostId(
      userid,
      photo.id,
    );
   return like;
  }

    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Post('/:postid')
    async addLike(@Param('postid') postid: string, @getUserbyId() userid: string){
      return await this.likeService.addLike(postid,userid);

    }
  }


