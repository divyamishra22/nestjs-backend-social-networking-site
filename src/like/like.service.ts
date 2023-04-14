import { Injectable } from '@nestjs/common';
import { Likes } from './like.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeRepository } from './like.repository';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Likes) private likeRepository: LikeRepository,
    
  ) {}
  async findLikeByUserAndPhotoId(
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

  async Likepost(userId: string, photoId: string): Promise<Likes> {
    return this.addLike(userId, photoId);
  }

  async unLikepost(like: Likes): Promise<void> {
    return this.removeLike(like);
  }

  async addLike(userId: string, postId: string): Promise<Likes> {
    const like = new Likes();
    like.userId = userId;
    like.postId = postId;

    await this.likeRepository.save(like);
    return like;
  }

  async removeLike(like: Likes): Promise<void> {
   await this.likeRepository.remove(like);
  }
}

