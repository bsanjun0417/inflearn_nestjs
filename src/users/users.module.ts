import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModel } from './entities/users.entity';
@Module({
  imports: [TypeOrmModule.forFeature([UsersModel])],
  exports:[UsersService],//다른 모듈에서도 사용가능하게함

  controllers: [UsersController],
  providers: [UsersService],
    //프로바이더안에 적은거는 해당 UsersModule에서만 사용가능함
    //export를 통해 외부 모듈에서도 사용가능
})
export class UsersModule {}
