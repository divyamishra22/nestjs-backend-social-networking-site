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

  async findLikeBypostId( postId: string): Promise<Likes> {
    const like = await this.likeRepository.findOne({ where: { postId: postId }});
    return like
  }

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
    const likes = await this.findLikeByUserAndPhotoId(userid, postid)
    if(likes.id)
    {const like = new Likes();
    like.userId = userid;
    like.postId = postid;
    return await this.likeRepository.save(like);}
    else{
      throw new ConflictException('Like already exists');
    }
  }

  async findLikeByUserAndPhotoId(
    userId: string,
    postId: string,
  ): Promise<any> {
    
   const likes= await this.findLikeBypostId(postId)
   if(likes)
    {return await this.likeRepository.createQueryBuilder('like')
      .where('like.userId = :userId AND like.postId = :postId', {
        userId,
        postId,
      })
      .getOne();}
    else{
      throw new NotFoundException('Likes not found');
    }
      
  }

  // async removeLike(like: string): Promise<void> {
  //  await this.likeRepository.remove(like);
  // }

  async deleteLikeById(id: string, ): Promise<any> {
    // const like = await this.findLikeByUserAndPostId(id, userid);
    // if (like.userId !== userid) {
    //   throw new UnauthorizedException('Unauthorized');
    // }
   
    const result = await this.likeRepository.delete({ id });
    return result.affected === 1;
    // if (result.affected === 0) {
    //   throw new NotFoundException(`Post not found`);
    // }
  }
}

