import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
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

    
    
    @Get('/:postid')
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    async getLike(@getUserbyId() userid: string,@Param('postid') postid:string ){
      return await this.likeService.findLikeByUserAndPhotoId(userid, postid)
    }


    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Post('/:postid')
    async likepost(@getUserbyId() userid:string, @Param('postid') postid: string){
      try
      {return await this.likeService.likepost(userid, postid);}
      catch{
        return true;
      }

    }


    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Delete('/:likeid')
    async deletelike(@Param('likeid') likeid: string, ){
      return await this.likeService.deleteLikeById(likeid , );
    }
  }


