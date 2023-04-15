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
  async viewPost(@Param('id') id: string,
  @getUserbyId() userid: string,): Promise<any> {
    
    const post = await this.postService.getPostById(id);
    let isAuthor = false;
    if (post.userId === userid) {
      isAuthor = true;
    }

    let isLiked = false;
    const like = await this.likeService.findLikeByUserAndPostId(
      userid,
      post.id,
    );
    if (like) {
      isLiked = true;
    }

    return { post, isAuthor, isLiked };
  }

  @Delete('/id')
  
  async DeletePhoto( @Param('id') id: string,
  @getUserbyId() userid: string,): Promise<any> {
    
    
    return this.postService.deletePostById(id, userid);
  }
}


