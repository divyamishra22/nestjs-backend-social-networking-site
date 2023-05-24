import { Controller, Post , Get , Delete, Body, Param, UseGuards, UseInterceptors, UsePipes, ValidationPipe, UploadedFile} from '@nestjs/common';
import { LikeService } from 'src/like/like.service';
import { PostsService } from './posts.service';
import { getUserbyId } from 'src/auth/auth.decorator';
import { User } from 'src/user/user.entity';
import { ApiBearerAuth, ApiProperty, ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiResponse, ApiConsumes, ApiBody } from "@nestjs/swagger";


class PostCreateRequestBody {
  @ApiProperty() text: string;
  @ApiPropertyOptional() image: string;
}


@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(
    private postService: PostsService,
    private likeService: LikeService,
  ) {}


  // @Post('/upload-image')
  // @ApiBearerAuth()
  // @UseInterceptors(FileInterceptor('file'))
  // @UsePipes(ValidationPipe)
  // @UseGuards(JwtGuard)
  // // @UsePipes(ValidationPipe)
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   type: 'multipart/form-data',
  //   required: true,
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       file: {
  //         type: 'string',
  //         format: 'binary'
  //       }
  //     }
  //   }
  // })
  // async uploadPhoto(
  //   @UploadedFile() file: Express.Multer.File,
  //    @getUserbyId() user: User,
  //   @Body() body: any,
  // ) {
  //    const key = file.buffer.toString('base64');
  //    const photoBody = body.body;
  //   // console.log(file)
  //    return await this.postService.uploadPost(key, user, photoBody);
  // }


  // @Post('/uploadimage')
  // @ApiBearerAuth()
  // @UseGuards(JwtGuard)
  // @UseInterceptors(
  //   FileInterceptor("file", {
  //     storage: diskStorage({
  //       filename: (_request, file, callback) =>
  //         callback(null, `${new Date().getTime()}-${file.originalname}`),
  //     }),
  //   }),
  // )
  // @ApiBody({
  //   required: true,
  //   type: "multipart/form-data",
  //   schema: {
  //     type: "object",
  //     properties: {
  //       file: {
  //         type: "string",
  //         format: "binary",
  //       },
  //     },
  //   },
  // })
  // @ApiConsumes("multipart/form-data")
  // async post(@UploadedFile() file,
  // @getUserbyId() user: User,): Promise<any> {
  //   console.log(file);
    
  // }




  @Post('/upload')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async uploadPost(
  @getUserbyId() user: string,
   @Body() postcreate: PostCreateRequestBody,) {

    return await this.postService.uploadPost( user, postcreate)
  }


  @Get('/:id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async viewPost(@Param('id') id: string,
  @getUserbyId() userid: string,): Promise<any> {
    
    const post = await this.postService.getPostByPostId(id);
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


  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Delete('/:postid')
  async DeletePhoto(@Param('postid') postid: string,
  @getUserbyId() userid: string,): Promise<any> {
    
    
    return this.postService.deletePostById(postid, userid);
  }


  @Get('/')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async getallposts(@getUserbyId() userid:string){
    return await this.postService.getFeedPosts(userid);
  }

  // @Get('alluserposts')
  // @ApiBearerAuth()
  // @UseGuards(JwtGuard)
  // async allposts(){
  //   return await this.postService.getallPosts();
  // }

}


