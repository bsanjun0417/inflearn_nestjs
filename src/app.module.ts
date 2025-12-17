import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModel } from './posts/entities/posts.entity';
import { UsersModule } from './users/users.module';
import { UsersModel } from './users/entities/users.entity';
import { UsersService } from './users/users.service';
@Module({
  imports: [
    PostsModule,
    //타입orm과 postgresql연결
    TypeOrmModule.forRoot({ 
      //DB 타입
      type: 'postgres',
      host: '127.0.0.1',
      port:5432,
      username:'postgres',
      password:'postgres',
      database:'postgres',
      entities:[
        PostsModel, 
        UsersModel
        // entity 폴더에 있는 db테이블 클래스
      ], //db와 연결될 모델들
      //synchronize는 네스트에서 작성하는 typeorm코드와
      //db의 싱크를 자동으로 맞출건지
      //개발단계에서는 true해야 편함 ,근데 배포운영 시 false 마음대로 db 구조를 바꿀수 있으니까 
      
      synchronize:true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
