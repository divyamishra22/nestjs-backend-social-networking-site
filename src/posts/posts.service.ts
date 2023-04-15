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

  async uploadPost( user: User, postbody: string) {
    const post = new Posts();
    post.body = postbody;
    post.user = user;
     return await this.postRepository.save(post);

  }

  async getPostById(userid: string): Promise<Posts> {
    const post = await this.postRepository.findOne({ where: { userId: userid } });
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
    if (result.affected === 0) {
      throw new NotFoundException(`Post not found`);
    }
  }
}

