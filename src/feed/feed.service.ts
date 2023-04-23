import { Injectable } from '@nestjs/common';
import { Likes } from 'src/like/like.entity';
import { Posts } from 'src/posts/posts.entity';

@Injectable()
export class FeedService {
    async getFeedData(
        feedsPhotos,
        userId: string,
      ): Promise<{ isAuthor: boolean; 
        // isLiked: boolean; 
        photo: Posts }> {
        return feedsPhotos.map((posts: Posts) => {
          let isAuthor = false;
          if (posts.userId === userId) {
            isAuthor = true;
          }
          // let isLiked = false;
          // posts.likes.map((like: Likes) => {
          //   if (like.userId === userId) {
          //     isLiked = true;
          //   }
          // });
          // return { isAuthor, isLiked, posts};
          return { isAuthor, posts};
        });
      }
}
