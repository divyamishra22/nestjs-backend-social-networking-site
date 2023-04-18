import { Controller, Post , Get , Delete, Body, Param, UseGuards} from '@nestjs/common';
import { LikeService } from 'src/like/like.service';
import { PostsService } from './posts.service';
import { getUserbyId } from 'src/auth/auth.decorator';
import { User } from 'src/user/user.entity';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';



class PostCreateRequestBody {
  @ApiProperty() text: string;
  
}


@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(
    private postService: PostsService,
    private likeService: LikeService,
  ) {}



  @Post('/upload')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async uploadPost(
  @getUserbyId() user: string,
  @Body() postcreate: PostCreateRequestBody,) {

    return await this.postService.uploadPost( user, postcreate)
  }


  @Get('/id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async viewPost(@Param('id') id: string,
  @getUserbyId() userid: string,): Promise<any> {
    
    const post = await this.postService.getPostById(userid);
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
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async DeletePhoto( @Param('id') id: string,
  @getUserbyId() userid: string,): Promise<any> {
    
    
    return this.postService.deletePostById(id, userid);
  }
}


