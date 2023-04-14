import { Controller,Get, Post, Patch, Param } from '@nestjs/common';



@Controller('user')
export class UserController {

    @Get('/username')
    async getUserByUsername(@Param('username') username: string): Promise<any> {
      return `username ${username}`;
    }
  
    @Get('/userid')
    async getUserByUserid(@Param('userid') userid: string): Promise<any> {
  
      return `userid = ${userid}`;
    }
  
    @Post('/signup')
    async createNewUser(): Promise<any> {

      return `new user created`;
    }
  
    
    @Patch('/userid')
    async updateUserDetails(): Promise<any> {

      return `user updated`;
    }
  
  
    

    
}
