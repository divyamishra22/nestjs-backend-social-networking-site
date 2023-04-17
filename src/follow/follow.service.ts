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
    
      // async getFollow(userToId: number, userFromId: number) {
      //   return this.followRepository.getFollow(userToId, userFromId);
      // }
    
      async createFollow(userId: string, userFollowid: string): Promise<any>{
        const follow = new Follow();
        follow.userId = userId;
        follow.userfollowId= userFollowid;
        return await this.followRepository.save(follow);  
        
      }
    
      // async deleteFollowById(id: number) {
      //   return this.followRepository.deleteFollowById(id);
      // }
    
      // async getUserFollows(userId: number) {
      //   return this.followRepository.getUserFollows(userId);
      // }
    
      // async getUserFollowers(userId: number) {
      //   return this.followRepository.getUserFollowers(userId);
      // }
}
