import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { PostsService } from 'src/posts/posts.service';
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

  

    
    
    @Get('/:postid')
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    async getLike(@getUserbyId() userid: string,@Param('postid') postid:string ){
     const like = await this.likeService.findLikeByUserAndPostId(userid, postid)
     if(like)
     {
     return like
     }
     else{
      return 0;
     }
    
    }


    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Post('/:postid')
    async likepost(@getUserbyId() userid:string, @Param('postid') postid: string){
      try
      {
        return await this.likeService.likepost(userid, postid);
      }
      catch{
        return true;
      }

    }

     
    @Get('/Likes/:postid')
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    async getalllikesonpostId(@Param('postid') postid:string){
      return await this.likeService.getlikesonpostId(postid);
    }


    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Delete('/:postid')
    async deletelike(@Param('postid') postid: string, @getUserbyId() userid:string){
      try{
      return await this.likeService.deleteLikeById(postid, userid );
      }
      catch{
        return false;
      }
    }



    @Put('/:id')
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    async handleLike(@Param('id') id: string, @getUserbyId() userid: string) {
      const post = await this.postService.getPostByPostId(id);
  
      const like = await this.likeService.findLikeByUserAndPostId(
        userid,
        post.id,
      );
  
      if (!like) {
        return this.likeService.likepost(userid, post.id);
      } else {
        return this.likeService.deleteLikeBylikeId(like.id);
      }
    }
  }


