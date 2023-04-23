import { Injectable } from '@nestjs/common';
import { Likes } from './like.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeRepository } from './like.repository';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Likes) private likeRepository: LikeRepository,
    private postservice: PostsService
    
  ) {}
  async findLikeByUserAndPostId(
    userId: string,
    postId: string,
  ): Promise<Likes> {
    return this.likeRepository
    .createQueryBuilder('like')
      .where('like.userId = :userId AND like.postId = :postId', {
        userId,
        postId,
      })
      .getOne();
  }

  // async Likepost(userId: string, photoId: string): Promise<Likes> {
  //   return this.addLike(userId, photoId);
  // }

  // async unLikepost(like: Likes): Promise<void> {
  //   return this.removeLike(like);
  // }

  // async addLike( userid: string, postId: string): Promise<Likes> {
  //   //  const post =  await this.postservice.getPostByPostId(postId);
    
  //   const like = new Likes();
  //   like.userId = userid;
  //   like.postId = postId;

  //  return await this.likeRepository.save(like);
     
   
  // }

  async likepost(userid: string , postid: string): Promise<any>{
    const like = new Likes();
    like.userId = userid;
    like.postId = postid;
    return await this.likeRepository.save(like);
  }

  async removeLike(like: Likes): Promise<void> {
   await this.likeRepository.remove(like);
  }
}

