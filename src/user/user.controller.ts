import { Controller,Get, Post, Patch, Param, Body, ForbiddenException, NotFoundException, UseGuards, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiProperty, ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { getUserbyId } from 'src/auth/auth.decorator';
import { PostsService } from 'src/posts/posts.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { FollowService } from 'src/follow/follow.service';
// import { GetUser } from './decorator';

class UserCreateRequestBody {
    @ApiProperty() @IsString() email: string;
    @ApiProperty() @IsEmail() @MinLength(3) password: string;
    @ApiProperty() @IsString() name: string;
    @ApiProperty() @IsString()  username: string;
    
  }
  
  class UserUpdateRequestBody {
    @ApiPropertyOptional() @IsString() @MinLength(3) password?: string;
    @ApiPropertyOptional() @IsString() name?: string;
     @ApiPropertyOptional()  @IsEmail() email?: string;
     @ApiPropertyOptional()  @IsString() @MinLength(3) username?: string;
     @ApiPropertyOptional()  @IsString() bio?: string;
  }


  class updateAvatar{
    @ApiProperty() avavtar: string;
  }


@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private userService: UserService,
      private postService: PostsService,
      private followService: FollowService) {}

  @ApiBearerAuth()
  @Get('/viewprofile/:username') // (/: to pass username as a parameter)
  @UseGuards(JwtGuard)
  async view(@Param('username') username: string, @getUserbyId() userid: string) {
    
    const user = await this.userService.getUserByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    else
    {
      const userPostsCount = await this.postService.getAllUserPostsCount(user.id);
     const userFollowingCount = await this.followService.getuserfollowing(user.id);
    const userFollowersCount = await this.followService.getUserFollowers(user.id);
    const userPosts = await this.postService.getallpostsofuser(user.id)
    let isProfile = false;
    if (user.id === userid) {
      isProfile = true;
    }

    const isFollow = await this.followService.getfollow(user.id, userid); // (users profile, user logged in)

    return {
      user,
        userPostsCount,
      userFollowingCount,
      userFollowersCount,
      isProfile,
      isFollow: isFollow ? true : false,
      userPosts
   
  }
}
  
  }

    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Get('/:username')
    async getUserByUsername(@Param('username') username: string): Promise<User> {
        const user = await this.userService.getUserByUsername(username);
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
    @Put('/:userid')
    async getuserbyUserId(@Param('userid') userid: string,): Promise<User> {
      return this.userService.findOne(userid);
    }

  
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Post('/update')
    async updateUserDetails(
    @getUserbyId() userId:string,
    @Body() updateUserRequest: UserUpdateRequestBody,
    ): Promise<User> {
          const user = await this.userService.updateUser(userId, updateUserRequest);
          return user;
    }
  

    @Post('/avatar')
   @ApiBearerAuth()
    @UseGuards(JwtGuard)
    async updateAvatar(
      @Body() updateavatar: updateAvatar,
      @getUserbyId() userid: string,
    ): Promise<any> {
      
      return this.userService.updateAvatar(updateavatar.avavtar, userid);
    }
  
    @Delete('/avatar')
   @ApiBearerAuth()
    @UseGuards(JwtGuard)
    async deleteAvatar(
      @getUserbyId() userid: string,
    ): Promise<any> {
      
      return this.userService.deleteAvatar(userid);
    }
 
 

  @Get('/search/:term')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  searchUsers(@Param('term') term: string) {
    return this.userService.searchUsers(term);
  }

  @ApiBearerAuth()
  @Get('/auth/me')
  @UseGuards(JwtGuard)
  getUserFromToken(@getUserbyId() userid:string) {
      return this.userService.findOne(userid);
  }
    
}
