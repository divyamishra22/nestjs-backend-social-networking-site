import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UserService,
         private jwtService: JwtService
        ) {}
    
      async validateUser(email: string): Promise<any> {
        const user = await this.usersService.findbyemail(email);
        if (user) {
    
          return user;
          }
        return null;
      }
    
      async login(email:string,password:string): Promise<any>{
        const user =  await this.validateUser(email);
        if(!user){
        return 'user does not exist';
      }
      // if(user &&  this.matchPassHash(password, user.password))
      if(user && user.password == password)
      {
        
        return  this.signUser(user.id, user.email, 'user');
      }
      else{
        return 'password not match';
      }
}
// private async matchPassHash(
//     password: string,
//     hash: string,
//   ): Promise<boolean> {
//      return (await compare(password, hash));
//     // return await bcrypt.compare(password, hash)
    
//   }
  
  signUser(userId: string, email: string, type:string){
    return this.jwtService.sign({
      sub:userId,
      email:email,
      type:type,
    })
  }
  
 
}
