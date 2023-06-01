import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

  


  async likepost(userid: string , postid: string): Promise<any>{
    const likes = await this.findLikeByUserAndPostId(userid, postid)
    if(!likes)
    {
      const like = new Likes();
    like.userId = userid;
    like.postId = postid;
    return await this.likeRepository.save(like);
  }
    else{
      throw new ConflictException('Like already exists');
    }
  }

  

  async deleteLikeById(postid, userid ): Promise<any> {
    const like = await this.findLikeByUserAndPostId(userid, postid);
    if(like)
    {
    if (like.userId !== userid) {
      throw new UnauthorizedException('Unauthorized');
    }
   else{
     const id = like.id
    const result = await this.likeRepository.delete({ id });
    return result.affected === 1;
   }
  }
    else {
      throw new NotFoundException(`Post not found`);
    }
  }

  async getlikesonpostId(postid): Promise<any>{
    return await this.likeRepository.createQueryBuilder('likes')
    .where('likes.postId = :postid', {
      postid,
    })
    .getCount(); 


  }

  async  deleteLikeBylikeId(id): Promise<any>{
    return await this.likeRepository.delete(id);

  }
}

