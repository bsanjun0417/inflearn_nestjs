import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[

    //jwt모듈 사용 임포트
    JwtModule.register({}) ,//회원가입 하는거로 옵션을 들어가나봄?
UsersModule
  ],
  //모듈을 불러와야됨 imports는
  controllers: [AuthController],
  providers: [AuthService],

})
export class AuthModule {}
