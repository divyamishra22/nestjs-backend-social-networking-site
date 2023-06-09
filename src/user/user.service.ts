import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { User,  } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository,  } from './user.repository';
import { hash } from 'bcrypt';
import { FollowService } from 'src/follow/follow.service';
import { Posts } from 'src/posts/posts.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepo: UserRepository ,
        private followservice: FollowService) {}

        public static PASSWORD_SALT_ROUNDS = 10;
      
      public async getUserByUsername(username: string): Promise<User> {
        return await this.userRepo.findOne({ where: { username } });
        
      }
    
      async findOne(id:string): Promise<User>{
        return await  this.userRepo.findOne({where: {id:id} });
       }
      
      public async findbyemail(email: string): Promise<User> {
        return await this.userRepo.findOne({ where: { email: email } });
      }
      
      public async createUser(
        createuser: Partial<User>,
        password: string,
      ): Promise<User> {
        if (createuser.username.length < 5)
          throw new BadRequestException('Username must be of minimum 5 characters');

          const userbyusername = await this.getUserByUsername(createuser.username)
          if(userbyusername)
          throw new ConflictException('This username is already taken!');

    
        if (password.length < 8)
          throw new BadRequestException('Password must be of minimum 8 characters');
    
        if (password.toLowerCase().includes('password'))
          throw new BadRequestException('Password cannot contain the word password itself');
    
        const emailAlreadyExists = await this.findbyemail(createuser.email);
        if (emailAlreadyExists)
          throw new ConflictException('This email is already taken!');
    
        const user = new User();
        // if(createuser.username)
        user.username = createuser.username;
        user.name = createuser.name
        user.password = createuser.password;
        //  user.password = await this.passToHash(user.password)
        user.email = createuser.email;
        const newUser = await this.userRepo.save(user);
        return newUser;
      }
    
      
      public async updateUser(
        userId: string,
        newUserDetails: Partial<User>,
      ): Promise<User> {
        const existingUser = await this.userRepo.findOne({
          where: { id: userId },
        });
        if (!existingUser) {
          return null;
        }
        if (newUserDetails.email) existingUser.email = newUserDetails.email;
        if (newUserDetails.username) existingUser.username = newUserDetails.username;
        if(newUserDetails.name) existingUser.name = newUserDetails.name;
        if(newUserDetails.username) existingUser.username = newUserDetails.username;
        if(newUserDetails.bio) existingUser.bio = newUserDetails.bio;
    
        return await this.userRepo.save(existingUser);
      }
      
      // private async passToHash(password: string): Promise<string> {
      //   return hash(password, UserService.PASSWORD_SALT_ROUNDS);
      // }
   
      async getUserFollows(userid: string): Promise<any> {
        // const user = await this.userRepo.findOne({
        //   where: { id:userid },
        //   relations: ['following'],
           return await this.followservice.getUserFollows(userid);
        //  });
      }
      
     
      async searchUsers(term) {
        return this.userRepo.createQueryBuilder('user')
          .where('user.username LIKE :term OR user.name LIKE :term', { term })
          .getMany();
      }

      async updateAvatar(avatar, userid){
       
        const user = await this.userRepo.findOne({
          where: { id: userid },
        });
        // to upload images of logged in user

        user.avatar = avatar;
        return await this.userRepo.save(user);
       
      }

      async deleteAvatar(userid){
       
        const user = await this.userRepo.findOne({
          where: { id: userid },
        });
        // to upload images of logged in user

        user.avatar = null;
        return await this.userRepo.save(user);
       
      }
}


