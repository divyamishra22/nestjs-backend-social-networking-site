import { Controller, Post , Get , Delete} from '@nestjs/common';

@Controller('posts')
export class PostsController {
    @Post('/upload')
  
  async uploadPost() {
    

    return `post created`;
  }

  @Get('/id')
  
  async viewPhoto(): Promise<any> {


    return `viewed post`;
  }

  @Delete('/id')
  
  async DeletePhoto(): Promise<any> {
    return `post deleted`;
  }
}


