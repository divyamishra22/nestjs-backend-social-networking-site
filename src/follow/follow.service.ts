import { Injectable, UseGuards } from '@nestjs/common';
import { FollowRepository } from './follow.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from './follow.entity';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Injectable()
export class FollowService {
    constructor(
        @InjectRepository(Follow)
        private followRepository: FollowRepository,
      ) {}
    
      
    
     
      async createFollow(userToId: string, userFromId: string): Promise<any>{
        const follow = new Follow();
        follow.userToId = userToId;
        follow.userFromId= userFromId;
        return await this.followRepository.save(follow);  
        
      }
    
    
      async getfollow(userToId:string, userFromId: string) {
        return this.followRepository
        .createQueryBuilder('follow')
        .where(
          'follow.userToId = :userToId AND follow.userFromId = :userFromId',
          {
            userToId,
            userFromId,
          },
        )
        .getOne();
      }

      async deletefollow(id:string): Promise<any>{
        return await this.followRepository.delete({id}) ;
      }

      async getUserFollows(userid:string): Promise<any> {
        return await this.followRepository.createQueryBuilder('following')
        .leftJoinAndSelect('following.userToId', 'userfollowingid')
        .where('following.userFromId = :userid', {
          userid,
        })
        .getMany(); 
        
      }

      async getuserfollowing(userid: string): Promise<number>{
        return await this.followRepository.createQueryBuilder('following')
        .leftJoinAndSelect('following.userToId', 'userfollowingid')
        .where('following.userFromId = :userid', {
          userid,
        })
        .getCount(); 
        
      }

      async getUserFollowers(userid) : Promise<number>{
        return await this.followRepository.createQueryBuilder('follow')
        .where('follow.userToId = :userToId', {
          userid,
        })
        .getCount();
      }
}
