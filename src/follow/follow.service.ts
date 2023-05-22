import { ConflictException, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { FollowRepository } from './follow.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from './follow.entity';
import { User } from 'src/user/user.entity';


@Injectable()
export class FollowService {
    constructor(
        @InjectRepository(Follow)
        private followRepository: FollowRepository,
      ) {}
    
      
    
     
      async createFollow(userToId: string, userFromId: string): Promise<any>{
        const isfollow = await this.getfollow(userToId, userFromId)
        if(!isfollow.id)
       { const follow = new Follow();
        follow.userToId = userToId;
        follow.userFromId= userFromId;
        return await this.followRepository.save(follow);  
        }
        else{
          throw new ConflictException('already following!');
        }
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


      async getfollowByUserid(userid): Promise<any>{
      return await this.followRepository.findOne({where: {userFromId:userid} })
      }

      async deletefollow(id:string): Promise<any>{
        return await this.followRepository.delete({id}) ;
        
      }

      async getUserFollows(userid:string): Promise<any> {
        const follow = await this.getfollowByUserid(userid);
        if(follow.id)
       { return await this.followRepository.createQueryBuilder('following')
        .leftJoinAndSelect('following.userToId', 'userfollowingid')
        .where('following.userFromId = :userid', {
          userid,
        })
        .getMany(); 
      }
      else{
        throw new NotFoundException('No Users Followed ')
      }
        
      }

      async getuserfollowing(userid: string): Promise<number>{
        return await this.followRepository.createQueryBuilder('following')
        // .leftJoinAndSelect('following.userToId', 'userfollowingid')
        .where('following.userFromId = :userid', {
          userid,
        })
        .getCount(); 
        
      }

      async getUserFollowers(userid) : Promise<number>{
        return await this.followRepository.createQueryBuilder('follow')
        // .leftJoinAndSelect('follow.userFromId', 'userfollowersid')
        .where('follow.userToId = :userid', {
          userid,
        })
        .getCount();
      }
}
