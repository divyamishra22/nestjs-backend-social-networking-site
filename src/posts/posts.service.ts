import { BadRequestException, Injectable, NotFoundException,  UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from './posts.repository';
import { User } from 'src/user/user.entity';
import { Posts } from './posts.entity';
// import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private postRepository: PostRepository,
    // private cloudinary: CloudinaryService
  ) {}

  // async uploadPhoto(key, user){
  //   const postimg = new Posts();
  //   postimg.url = key;
  //   postimg.userId = user;
  //    return await this.postRepository.save(postimg);
  // }

  async uploadPost( user: string, postcreate) {
    // const url = await this.cloudinary.uploadImage(file).catch(() =>{
    //   throw new BadRequestException('Invalid file Type.');
    // })
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
  


  async getallpostsofuser(userid:string): Promise<Posts[]> {
    return await this.postRepository
    .createQueryBuilder('posts')
    .where('posts.userId: userid',{userid})
    .getMany();
  }

  async getAllUserPostsCount(userId: string) {
    try{
    await this.getPostById(userId);
    }
    catch(NotFoundException){
      return 0;
    }
    return this.postRepository
    .createQueryBuilder('post')
      .where('post.userId = userId', {userId})
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
    return await this.postRepository.createQueryBuilder('post')
    // .leftJoinAndSelect('post.post', 'posted')
      // .leftJoinAndSelect('posts.userId', 'postedBy')
      // .leftJoinAndSelect('post.likes', 'likes')
      // .where('post.userId IN (...arrayUsersId)', { arrayuserid })
      .where('post.userId = :arrayuserid', {arrayuserid})
      .getMany();
  }

  async getFeedPost(arrayuserid): Promise<any>{
    const arrayuserId = arrayuserid.map((_user) => _user.id);
    return await this.postRepository.createQueryBuilder('posts')
    // .leftJoinAndSelect('post.post', 'posted')
      //  .leftJoinAndSelect('posts.userId', 'postedBy')
      // .leftJoinAndSelect('post.likes', 'likes')
      
        .where('posts.userId IN (:...arrayuserId)', { arrayuserId })
      .getMany();

  }
 async getallPosts(): Promise<Posts[]>{
  return await this.postRepository.find();
 }

}

