import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UserService,
        // private jwtService: JwtService
        ) {}
    
      async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findbyemail(email);
        if (user) {
    
          return user;
          }
        return null;
      }
    
      async login(email:string,password:string): Promise<any>{
        const user =  await this.validateUser(email,password);
        if(!user){
        return 'user does not exist';
      }
      if(user &&  this.matchPassHash(password, user.password))
      {
        
        return 'user logged'
      }
      else{
        return 'password not match';
      }
}
private async matchPassHash(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return (await compare(password, hash)) === true;
  }
  
  

}
