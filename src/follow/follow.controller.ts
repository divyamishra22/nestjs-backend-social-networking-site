import { BadRequestException, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { FollowService } from './follow.service';
import { UserService } from 'src/user/user.service';
import { getUserbyId } from 'src/auth/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('follow')
export class FollowController {
    constructor(
        private followService: FollowService,
        private userService: UserService,
      ) {}
    
      @Post('/:userid')
      @UseGuards(JwtGuard)
      async handleFollow(@Param('userid') userid: string, @getUserbyId() userId: string) {
        const user = await this.userService.getUserByUserId(userid);
        if (user.id === userId) {
          throw new BadRequestException('You cant follow Yourself..');
        }
      return await this.followService.createFollow(user.id, userId); // (user to follow, user logged in)
        
      }

      async getfollow(@Param('userid') userid:string, @getUserbyId() userId:string) {
            return await this.followService.getfollow(userid, userId);
      }
}
