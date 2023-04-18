import { Body, Controller, Post } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

class UserVerifyRequestBody{
    @ApiProperty() password: string;
     @ApiProperty()  email: string;
  }
   

  @ApiTags('auth')
@Controller('auth')
export class AuthController {
constructor(private readonly authService: AuthService){}

  
    @Post('/login')
     async login(@Body()userverifyrequest: UserVerifyRequestBody): Promise<any>{
      const user = await this.authService.login(userverifyrequest.email, userverifyrequest.password);
      return user;
     }
}


