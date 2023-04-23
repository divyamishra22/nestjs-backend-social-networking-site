import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { User,  } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository,  } from './user.repository';
import { hash } from 'bcrypt';
import { FollowService } from 'src/follow/follow.service';

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
      
      
      public async getUserByUserId(userId: string): Promise<User> {
        return await this.userRepo.findOne({ where: { id: userId } });
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
    
        if (password.length < 8)
          throw new BadRequestException('Password must be of minimum 8 characters');
    
        if (password.toLowerCase().includes('password'))
          throw new BadRequestException(
            'Password cannot contain the word password itself',
          );
    
        const usernameAlreadyExists = await this.getUserByUsername(createuser.username);
        if (usernameAlreadyExists)
          throw new ConflictException('This username is already taken!');
    
        const user = new User();
        user.username = createuser.username;
        user.password = password;
         user.password = await this.passToHash(user.password)
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
    
        return await this.userRepo.save(existingUser);
      }
      
      private async passToHash(password: string): Promise<string> {
        return hash(password, UserService.PASSWORD_SALT_ROUNDS);
      }
   
      async getUserFollows(userid: string): Promise<any> {
        // const user = await this.userRepo.findOne({
        //   where: { id:userid },
        //   relations: ['following'],
           return await this.followservice.getUserFollows(userid);
        //  });
      }
      
}


