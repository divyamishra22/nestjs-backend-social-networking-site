import { Injectable, UnauthorizedException } from "@nestjs/common";
import {  PassportStrategy } from "@nestjs/passport";
import { jwtConstants } from "../constants";
import { UserService } from "src/user/user.service";
import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";

@Injectable()
export class JwtStrategy extends  PassportStrategy(Strategy){
 
 constructor( private userService: UserService){
      
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: jwtConstants.secret,
       
    });
 }

 async validate(payload:any){
   
   console.log('validate');
   const{userid} = payload
   const user = await this.userService.findOne(userid);
   
    if (!user) {
      throw new UnauthorizedException();
    }
    console.log('validate()',payload);
    return payload;
  }

    
}