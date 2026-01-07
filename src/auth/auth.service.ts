import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersModel } from 'src/users/entities/users.entity';
import { JWT_SECRET } from 'src/auth/const/auth.const';
import { UsersService } from './../users/users.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly UsersService: UsersService,
  ) {}
  //signToken 페이로드에 들어갈 정보
  /*
        페이로드는 아무나 다 까서 볼수 있어서 개인정보는 싫어할수 있음
           여기서 공부할겸 넣는거임 이메일 같은거는 안넣어도됨 개인정보니까
            1.이메일,
            2. sub => id 현재 사용자의 아이디를 의미
            3.type=> 엑세스토큰인지 or 리프레쉬토큰인지 
        */
  signToken(user: Pick<UsersModel, 'email' | 'id'>, isRefreshToken: boolean) {
    //토큰 만드는거임
    //Pick<T,K>T타입에서K프로퍼티만 골라서 사용함
    //email:string,id:number 결과적으로 같지만 문맥적 효과?

    const payload = {
      email: user.email,
      sub: user.id,
      type: isRefreshToken ? 'refresh' : 'access',
    };
    //페이로드를 토대로 jwt토큰 형태로 만들기 sign해야해
    return this.jwtService.sign(payload, {
      secret: JWT_SECRET, //비밀키
      expiresIn: isRefreshToken ? 3600 : 300,
      //만료될때까지 시간이 얼마나 걸리는지 초 단위로 입력 리프레쉬는 3600
    });
  }
  loginUser(user: Pick<UsersModel, 'email' | 'id'>) {
    return {
      accessToken: this.signToken(user, false),
      refreshToken: this.signToken(user, true),
    };
  }
  async authenticateWithEmailAndPassword(
    user: Pick<UsersModel, 'email' | 'password'>,
  ) {
    const existingUser = await this.UsersService.getUserByEmail(user.email);

    if (!existingUser) {
      throw new UnauthorizedException('존재하지 않은 사용자'); //user정보가 없으면 보내는 에러
    }
    /*파라미터에 넣을거
    1.입력된 비밀번호
    2.기존에 해시 => 사용자 정보에 저장되있는 hash
    클라이언트에서 온 비번이랑 , db에 암호화되어 저장되있는 hash상태의 비밀번호를
    bcrypt가 비교를 해서 맞으면 true를 반환하고 틀리면 false를 반환함
    */
    const passOk = await bcrypt.compare(user.password, existingUser.password);
    //직접해쉬를 해서 비교 안해도됨 이걸 사용해서

    if(!passOk){
      throw new UnauthorizedException('비밀번호가 틀렸음');
    }

    return existingUser;
  }
}
