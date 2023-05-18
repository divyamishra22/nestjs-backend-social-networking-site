import { Controller,Get, Post, Patch, Param, Body, ForbiddenException, NotFoundException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiProperty, ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { getUserbyId } from 'src/auth/auth.decorator';
import { PostsService } from 'src/posts/posts.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { IsEmail, IsString, MinLength } from 'class-validator';

class UserCreateRequestBody {
    @ApiProperty() @IsString() email: string;
    @ApiProperty() @IsEmail() @MinLength(3) password: string;
    @ApiProperty() @IsString() name: string;
    @ApiPropertyOptional() @IsString()  username: string;
    // @ApiPropertyOptional() bio?: string;
  }
  
  class UserUpdateRequestBody {
    @ApiPropertyOptional() @IsString() @MinLength(3) password?: string;
    @ApiPropertyOptional() @IsString() name?: string;
     @ApiPropertyOptional()  @IsEmail() email?: string;
  }



@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private userService: UserService,
      private postService: PostsService) {}

    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Get('/username')
    async getUserByUsername(@Param('username') username: string): Promise<User> {
        const user = await this.userService.getUserByUsername(username);
        if (!user) {
          throw new NotFoundException('User not found');
        }
        return user;
    }
  
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Get('/userid')
    async getUserByUserid(@Param('userId') userid: string): Promise<User> {
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
  
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Patch('/userid')
    async updateUserDetails(
    @Param('userid') userid: string,
    @Body() updateUserRequest: UserUpdateRequestBody,
    ): Promise<User> {
          const user = await this.userService.updateUser(userid, updateUserRequest);
          return user;
    }
  

    @ApiBearerAuth()
    @UseGuards(JwtGuard)
  @Get('/allposts')
  async getallpostofuser(@getUserbyId() userid:string)
  {
      return this.postService.getallpostsofuser(userid);
  }
    

  @Get('/allusers')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async allposts(){
    return await this.userService.getallUsers();
  }

    
}
