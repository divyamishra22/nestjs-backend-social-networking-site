import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Posts } from 'src/posts/posts.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Posts]), 
        // forwardRef(() => Posts)
      ],
      controllers: [UserController],
      providers: [UserService, ],
})
export class UserModule {}
