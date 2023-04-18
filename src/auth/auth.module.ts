import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './guards/jwt.strategy';

@Module({
    imports: [
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '10days' },
          }),
    //    UserModule
    forwardRef(() => UserModule),
       
      ],
      controllers: [AuthController],
      providers: [AuthService, JwtStrategy],
    //   exports: [AuthService,JwtStrategy]
})
export class AuthModule {}
