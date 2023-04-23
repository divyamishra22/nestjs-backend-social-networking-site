import { Controller, Get, UseGuards } from '@nestjs/common';
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
    
      @Get()
      @ApiBearerAuth()
      @UseGuards(JwtGuard)
      async feedData(
        @getUserbyId() userid: string,
      ): Promise<{ isAuthor: boolean;
        //  isLiked: boolean;
          photo: Posts }> {
        const user = await this.userService.getUserFollows(userid);
        const arrayUsersId = user.userToId.map((_user) => _user.id);
        arrayUsersId.push(userid); // because we also want to show our photos in feed
    
        const feedsPhotos = await this.postService.getFeedPosts(arrayUsersId);
    
        return this.feedService.getFeedData(feedsPhotos, userid);
      }
}
