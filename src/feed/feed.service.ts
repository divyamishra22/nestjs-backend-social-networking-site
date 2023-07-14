import { Injectable } from '@nestjs/common';
import { Likes } from 'src/like/like.entity';
import { LikeService } from 'src/like/like.service';
import { Posts } from 'src/posts/posts.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class FeedService {
  constructor(
    // private likeservice: LikeService,
    // private userservice: UserService
    ) {}
    async getFeedData(
        feedsPhotos,
        userId: string,
      ): Promise<{ isAuthor: boolean; 
        isLiked: boolean;
        // countlikes:any; 
        photo: Posts }> {
        return feedsPhotos.map((posts: Posts) => {
          let isAuthor = false;
          let isLiked =  false;
          if (posts.userId === userId) {
            isAuthor = true;
          }
          
          posts.likes.map((like: Likes) => {
            if (like.userId === userId) {
              isLiked = true;
            }
            else{
              isLiked = false;
            }
          });

      // const loggedinuser = this.userservice.findOne(userId)

      // let countlikes = this.likeservice.getlikesonpostId(posts.id)
          // let isLiked = false;
          // posts.likes.map((like: Likes) => {
          //   if (like.userId === userId) {
          //     isLiked = true;
          //   }
          // });
          return { isAuthor, isLiked, posts,
            //  loggedinuser 
            // countlikes
          };
          //  return { isAuthor, posts};
        });
      }


      async getfeed(
        posts,
        userId: string,
      ): Promise<{ isAuthor: boolean; 
        isLiked: boolean;
        // countlikes:any; 
        posts: Posts }> {
       
          let isAuthor = false;
          let isLiked =  false;
          if (posts.userId === userId) {
            isAuthor = true;
          }
          
          posts.likes.map((like: Likes) => {
            if (like.userId === userId) {
              isLiked = true;
            }
            else{
              isLiked = false;
            }
          });

          return { isAuthor, isLiked,posts  };
         
       
      }


      

}
