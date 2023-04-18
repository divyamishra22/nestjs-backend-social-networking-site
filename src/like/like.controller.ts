import { Controller, Param, Post } from '@nestjs/common';
import { LikeService } from './like.service';
import { PostsService } from 'src/posts/posts.service';
import { User } from 'src/user/user.entity';
import { getUserbyId } from 'src/auth/auth.decorator';
import { ApiTags } from '@nestjs/swagger';



@ApiTags('likes')
@Controller('like')
export class LikeController {
  constructor(private likeService: LikeService,
    private postService: PostsService,) {}

  @Post('/:id')
 
  async handleLike(@Param('id') id: string, @getUserbyId() userid: string ) {
    const photo = await this.postService.getPostById(id);

    const like = await this.likeService.findLikeByUserAndPostId(
      userid,
      photo.id,
    );

    if (!like) {
      return this.likeService.addLike(userid, photo.id);
    } else {
      return this.likeService.removeLike(like);
    }
  }
}

