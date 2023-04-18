import { Controller,Get, Post, Patch, Param, Body, ForbiddenException, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiProperty, ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { getUserbyId } from 'src/auth/auth.decorator';
import { PostsService } from 'src/posts/posts.service';

class UserCreateRequestBody {
    @ApiProperty() username: string;
    @ApiProperty() password: string;
    @ApiPropertyOptional() email: string;
    // @ApiPropertyOptional() bio?: string;
  }
  
  class UserUpdateRequestBody {
    @ApiPropertyOptional() password?: string;
    @ApiPropertyOptional() name?: string;
     @ApiPropertyOptional() email?: string;
  }



@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private userService: UserService,
      private postService: PostsService) {}

    @Get('/username')
    async getUserByUsername(@Param('username') username: string): Promise<User> {
        const user = await this.userService.getUserByUsername(username);
        if (!user) {
          throw new NotFoundException('User not found');
        }
        return user;
    }
  
    @Get('/userid')
    async getUserByUserid(@Param('userid') userid: string): Promise<User> {
        const user = await this.userService.getUserByUserId(userid);

        if (!user) {
          throw new NotFoundException('User not found');
        }
    
        return user;
      
    }
  
    @Post('/signup')
    async createNewUser(
        @Body() createUserRequest: UserCreateRequestBody,
    ): Promise<User> {
        const user = await this.userService.createUser(
            createUserRequest,
            createUserRequest.password,
          );
          return user;
    }
  
    
    @Patch('/userid')
    async updateUserDetails(
    @Param('userid') userid: string,
    @Body() updateUserRequest: UserUpdateRequestBody,
    ): Promise<User> {
          const user = await this.userService.updateUser(userid, updateUserRequest);
          return user;
    }
  
  @Get('/allposts')
  async getallpostofuser(@getUserbyId() userid:string)
  {
      return this.postService.getallpostsofuser(userid);
  }
    

    
}
