import { Controller, Post , Get , Delete, Body, Param, UseGuards, UseInterceptors, UsePipes, ValidationPipe, UploadedFile} from '@nestjs/common';
import { LikeService } from 'src/like/like.service';
import { PostsService } from './posts.service';
import { getUserbyId } from 'src/auth/auth.decorator';
import { User } from 'src/user/user.entity';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiResponse, ApiConsumes, ApiBody } from "@nestjs/swagger";


class PostCreateRequestBody {
  @ApiProperty() text: string;
  @ApiProperty() image: string;
}


@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(
    private postService: PostsService,
    private likeService: LikeService,
  ) {}


  // @Post('/uploadimage')
  // @ApiBearerAuth()
  // @UseInterceptors(FileInterceptor('file'))
  // @UseGuards(JwtGuard)
  // @UsePipes(ValidationPipe)
  // async uploadPhoto(
  //   @UploadedFile() file: Express.Multer.File,
  //   @getUserbyId() user: User,
  //   // @Body() body: any,
  // ) {
  //   const key = file.buffer.toString('base64');
  //   // const photoBody = body.body;

  //   return await this.postService.uploadPhoto(key, user);
  // }


  @Post('/uploadimage')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
  @ApiBody({
    required: true,
    type: "multipart/form-data",
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  @ApiConsumes("multipart/form-data")
  async post(@UploadedFile() file,
  @getUserbyId() user: User,): Promise<any> {
    console.log(file);
    
  }





















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
    
    const post = await this.postService.getPostByPostId(userid);
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


  @Get('/')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async getallposts(@getUserbyId() userid:string){
    return await this.postService.getFeedPosts(userid);
  }
}


