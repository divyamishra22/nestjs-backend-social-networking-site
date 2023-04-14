import { Controller, Param, Post } from '@nestjs/common';
import { LikeService } from './like.service';
import { PostsService } from 'src/posts/posts.service';
import { User } from 'src/user/user.entity';
import { getUserbyId } from 'src/auth/auth.decorator';

@Controller('like')
export class LikeController {
  constructor(private likeService: LikeService,
    private postService: PostsService,) {}

  @Post('/:id')
 
  async handleLike(@Param('id') id: string, @getUserbyId() user: User ) {
    const photo = await this.postService.getPostById(id);

    const like = await this.likeService.findLikeByUserAndPhotoId(
      user.id,
      photo.id,
    );

    if (!like) {
      return this.likeService.addLike(user.id, photo.id);
    } else {
      return this.likeService.removeLike(like);
    }
  }
}

