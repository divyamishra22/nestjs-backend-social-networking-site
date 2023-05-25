import { BadRequestException, Injectable, NotFoundException,  UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from './posts.repository';
import { User } from 'src/user/user.entity';
import { Posts } from './posts.entity';
import { UserService } from 'src/user/user.service';
// import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private postRepository: PostRepository,
    //  private userservice: UserService
  ) {}

  

  async uploadPost( user: string, postcreate) {
    const posts = new Posts();
    if(postcreate.text)
    {posts.post = postcreate.text;}
    if(postcreate.image)
    {posts.image = postcreate.image;}
    posts.userId = user;
     return await this.postRepository.save(posts);

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
  


  async getallpostsofuser(userId:string): Promise<Posts[]> {
    return await this.postRepository
    .createQueryBuilder('posts')
    .where('posts.userId = :userId',{userId})
    .getMany();
  }

  async getAllUserPostsCount(userId: string) {
    try{
   const userpost= await this.getPostById(userId);
   const userid = userpost.userId;
    return this.postRepository
    .createQueryBuilder('post')
      .where('post.userId = :userid', {userid})      // mandatory to use : before userid
      .getCount()
    }
    catch(NotFoundException){
      return 0;
    }

  }


  async deletePostById(id: string, userid:string): Promise<any> {
    const post = await this.getPostByPostId(id);
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
    return await this.postRepository.createQueryBuilder('post')
    // .leftJoinAndSelect('post.post', 'posted')
      .leftJoinAndSelect('post.user', 'postedBy')
      .leftJoinAndSelect('post.likes', 'likes')
      .where('post.userId IN (:...arrayuserid)', {arrayuserid})
      .getMany();
  }


}

