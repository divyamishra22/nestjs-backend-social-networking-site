import { Injectable } from '@nestjs/common';
import { FollowRepository } from './follow.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from './follow.entity';

@Injectable()
export class FollowService {
    constructor(
        @InjectRepository(FollowRepository)
        private followRepository: FollowRepository,
      ) {}
    
      
    
      async createFollow(userId: string, userFollowid: string): Promise<any>{
        const follow = new Follow();
        follow.userId = userId;
        follow.userfollowId= userFollowid;
        return await this.followRepository.save(follow);  
        
      }
    
    
      async getfollow(userid:string, userId: string) {
        return this.followRepository
        .createQueryBuilder('follow')
        .where(
          'follow.userfollowId = :userid AND follow.userId = :userId',
          {
            userid,
            userId,
          },
        )
        .getOne();
      }
}
