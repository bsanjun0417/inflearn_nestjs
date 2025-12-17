import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModel } from './entities/posts.entity';

@Module({
  imports:[
    //모델에 해당하는 레포지터리를 주입할때 사용 튜플들 넣을때 사용한다는거
    TypeOrmModule.forFeature([
      PostsModel
    ])
  ],
  controllers: [PostsController],
  providers: [PostsService],
  //콘트롤러와 프로바이더를 작성해야됨
  //컨트롤러에 넣을 서비스 의존성 주입할거를 프로바이더에 넣어줘야한다 여기넣어야 인스턴스화 없어 ioc가 컨트롤러로 넣도록 도와줌
})
export class PostsModule {}
