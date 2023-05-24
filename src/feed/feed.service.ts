import { Injectable } from '@nestjs/common';
import { Likes } from 'src/like/like.entity';
import { LikeService } from 'src/like/like.service';
import { Posts } from 'src/posts/posts.entity';

@Injectable()
export class FeedService {
  constructor(
    private likeservice: LikeService) {}
    async getFeedData(
        feedsPhotos,
        userId: string,
      ): Promise<{ isAuthor: boolean; 
        isLiked: boolean;
        countlikes:any; 
        photo: Posts }> {
        return feedsPhotos.map((posts: Posts) => {
          let isAuthor = false;
          let isLiked =  false;
          if (posts.userId == userId) {
            isAuthor = true;
          }
          
      const findlike = this.likeservice.findLikeByUserAndPostId(userId, posts.id)
      if(findlike){
      isLiked = true;
      }

      let countlikes = this.likeservice.getlikesonpostId(posts.id)
          // let isLiked = false;
          // posts.likes.map((like: Likes) => {
          //   if (like.userId === userId) {
          //     isLiked = true;
          //   }
          // });
          return { isAuthor, isLiked, posts, countlikes};
          //  return { isAuthor, posts};
        });
      }
}
