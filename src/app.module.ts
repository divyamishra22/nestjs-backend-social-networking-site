import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      //host: 'localhost',
      //
      port: 5432,
      username: 'postgres',
      password: 'divya123',
      database: 'mydb1',
      entities: [User],
      synchronize: true,
      logger:'advanced-console',
      logging: 'all',  
    }),
    UserModule],
  controllers: [AppController, ],
  providers: [AppService, ],
})
export class AppModule {}
