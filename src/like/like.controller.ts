import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { PostsService } from 'src/posts/posts.service';
import { User } from 'src/user/user.entity';
import { getUserbyId } from 'src/auth/auth.decorator';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UserService } from 'src/user/user.service';





@ApiTags('likes')
@Controller('like')
export class LikeController {
  constructor(private likeService: LikeService,
    private postService: PostsService,
   ) {}

  // @Post('/:id')
  // async handleLike(@Param('id') id: string, @getUserbyId() userid: string ) {
  //   const photo = await this.postService.getPostByPostId(id);

  //   const like = await this.likeService.findLikeByUserAndPostId(
  //     userid,
  //     photo.id,
  //   );
  //  return like;
  // }

    
    
    // @Post('/:postid')
    // @ApiBearerAuth()
    // @UseGuards(JwtGuard)
    // async addLike(@getUserbyId() userid: string,@Param('postid') postid:string ){
    //   // return await this.likeService.addLike(postid,userid);
    //   // const user = await this.userService.getUserByUserId(userid);
    //   // return user;
    //   const post = await this.postService.getPostByPostId(postid);
    //   return post
    // }


    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Post('/:postid')
    async likepost(@getUserbyId() userid:string, @Param('postid') postid: string){
      return await this.likeService.likepost(userid, postid);
    }
  }


