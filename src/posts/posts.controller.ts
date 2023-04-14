import { Controller, Post , Get , Delete, Body, Param} from '@nestjs/common';
import { LikeService } from 'src/like/like.service';
import { PostsService } from './posts.service';
import { getUserbyId } from 'src/auth/auth.decorator';
import { User } from 'src/user/user.entity';

@Controller('posts')
export class PostsController {
  constructor(
    private postService: PostsService,
    private likeService: LikeService,
  ) {}

    @Post('/upload')
  
  async uploadPost(
  @getUserbyId() user: User,
  @Body() body: any,) {
    const photoBody = body.body;

    return await this.postService.uploadPost( user, photoBody)
  }

  @Get('/id')
  async viewPhoto(@Param('id') id: string,
  @getUserbyId() user: User,): Promise<any> {
    
    const post = await this.postService.getPostById(id);
    let isAuthor = false;
    if (post.userId === user.id) {
      isAuthor = true;
    }

    let isLiked = false;
    const like = await this.likeService.findLikeByUserAndPhotoId(
      user.id,
      post.id,
    );
    if (like) {
      isLiked = true;
    }

    return { post, isAuthor, isLiked };
  }

  @Delete('/id')
  
  async DeletePhoto( @Param('id') id: string,
  @getUserbyId() user: User,): Promise<any> {
    
    
    return this.postService.deletePostById(id, user);
  }
}


