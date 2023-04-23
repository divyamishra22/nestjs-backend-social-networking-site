import { Injectable, NotFoundException,  UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from './posts.repository';
import { User } from 'src/user/user.entity';
import { Posts } from './posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private postRepository: PostRepository,
  ) {}

  async uploadPost( user: string, postbody) {
    const post = new Posts();
    post.post = postbody;
    post.userId = user;
     return await this.postRepository.save(post);

  }

  async getPostById(userid: string): Promise<Posts> {
    const post = await this.postRepository.findOne({ where: { userId: userid } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    
    return post;
  }


async getPostByPostId(postid:string): Promise<Posts>{
  const post = await this.postRepository.findOne({where:{ id: postid}});
  if (!post) {
    throw new NotFoundException('Post not found');
  }
  
  return post;
}
  


  async getallpostsofuser(userid:string): Promise<Posts[]> {
    return await this.postRepository
    .createQueryBuilder('posts')
    .where('posts.userId: userid',{userid})
    .getMany();
  }

  async getAllUserPostsCount(userId: string) {
    return this.postRepository
    .createQueryBuilder('post')
      .where('post.userId = :id', {userId,})
      .getCount()
  }


  async deletePostById(id: string, userid:string): Promise<any> {
    const post = await this.getPostById(id);
    if (post.userId !== userid) {
      throw new UnauthorizedException('Unauthorized');
    }
   
    const result = await this.postRepository.delete({ id });
    return result.affected === 1;
    // if (result.affected === 0) {
    //   throw new NotFoundException(`Post not found`);
    // }
  }

  async getFeedPosts(arrayuserid: string): Promise<any>{
    return await this.postRepository.createQueryBuilder('posts')
    // .leftJoinAndSelect('post.post', 'posted')
      // .leftJoinAndSelect('posts.userId', 'postedBy')
      // .leftJoinAndSelect('post.likes', 'likes')
      // .where('post.userId IN (...arrayUsersId)', { arrayuserid })
      .where('posts.userId = :arrayuserid', {arrayuserid})
      .getMany();
  }
}

