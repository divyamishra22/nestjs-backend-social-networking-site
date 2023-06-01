import { Controller, Get, NotFoundException, UseGuards } from '@nestjs/common';
import { getUserbyId } from 'src/auth/auth.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Posts } from 'src/posts/posts.entity';
import { UserService } from 'src/user/user.service';
import { FeedService } from './feed.service';
import { PostsService } from 'src/posts/posts.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('feed')
@Controller('feed')
export class FeedController {
    constructor(
        private feedService: FeedService,
        private userService: UserService,
        private postService: PostsService
      ) {}
    
      @Get('/')
      @ApiBearerAuth()
      @UseGuards(JwtGuard)
      async feedData(
        @getUserbyId() userid: string,
      ): Promise<any> {
        // try
        // {
          const user = await this.userService.getUserFollows(userid);
       const arrayUsersId = user.map((_user) => _user.userToId);
        arrayUsersId.push(userid); // because we also want to show our photos in feed
    
        //   // return arrayUsersId;
         const feedsPhotos = await this.postService.getFeedPosts(arrayUsersId);
        
    
        
         return this.feedService.getFeedData(feedsPhotos, userid);
       
      // }
      // catch{
      //   return false;
      // }
      
      }
}
