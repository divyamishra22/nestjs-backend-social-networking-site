import { BadRequestException, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { FollowService } from './follow.service';
import { UserService } from 'src/user/user.service';
import { getUserbyId } from 'src/auth/auth.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('follow')
@Controller('follow')
export class FollowController {
    constructor(
        private followService: FollowService,
        private userService: UserService,
      ) {}
    
      @Post('/:userid')
      @ApiBearerAuth()
      @UseGuards(JwtGuard)
      async handleFollow(@Param('userid') userid: string, @getUserbyId() userId: string) {
        const user = await this.userService.findOne(userid);
        if (user.id === userId) {
          throw new BadRequestException('You cant follow Yourself..');
        }
        // try{
      return await this.followService.createFollow(user.id, userId); // (user to follow, user logged in)
        // }
        // catch{
        //   return true;
        // } 
      }

      @ApiBearerAuth()
      @UseGuards(JwtGuard)
      @Get('/:userToId')
      async getfollow(@Param('userToId') userToId:string, @getUserbyId() userFromId:string) {
            return await this.followService.getfollow(userToId, userFromId);
      }


      @ApiBearerAuth()
      @UseGuards(JwtGuard)
      @Delete('/:id')           //params should always have :then the id/userid
      async deletefollow(@Param('id') id:string , @getUserbyId() userid:string){
      //  const res = await this.followService.getfollow(id, userid);
        return await this.followService.deletefollow(id);
      }

      @Get('/')
      @ApiBearerAuth()
      @UseGuards(JwtGuard)
      async getuserfollow(@getUserbyId() userid: string){
        try
       { const follow = await this.followService.getUserFollows(userid);
          return follow;
        }
       catch{
        return false;
       }
      }

      // @ApiBearerAuth()
      // @Put('/:userId')
      // @UseGuards(JwtGuard)
      // async Follow(@Param('userId') userId: string, @getUserbyId() userid:string) {
      //   const user = await this.userService.findOne(userId);
      //   if (user.id === userid) {
      //     throw new BadRequestException('You cant follow Yourself..');
      //   }
    
      //   const follow = await this.followService.getfollow(userId, userid); // (user to follow, user logged in)
      //   if (follow) {
      //     return await this.followService.deletefollow(follow.id);
      //   } 
      // }


      @Put('/:id')
      @ApiBearerAuth()
      @UseGuards(JwtGuard)
      async handleFollows(@Param('id') id: string, @getUserbyId() userid: string) {
        const user = await this.userService.findOne(id);
        if (user.id === userid) {
          throw new BadRequestException('You cant follow Yourself..');
        }
    
        const follow = await this.followService.getfollow(user.id, userid); // (user to follow, user logged in)
        if (!follow) {
          return await this.followService.createFollow(user.id, userid)
          
        } else {
          return await this.followService.deletefollow(follow.id);
         // (user to follow, user logged in)
        }
      }
}
