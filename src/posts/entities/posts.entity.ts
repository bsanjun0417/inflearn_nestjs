import { UsersModel } from 'src/users/entities/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PostsModel {
    //기본키를 정해야됨 겹치지않는거
  //칼럼 속성

  @PrimaryGeneratedColumn() //자동으로 1씩 올라감? 기본키 설정
  id: number;
  //궁금한게 자동으로 올라가는거 ? 기능이 넘버타입이면 그렇게 되는건가? 
  @ManyToOne(()=>UsersModel , (user)=>user.posts,{
    nullable:false
  } )//3번째는 조건 널이 될수 없다
  author: UsersModel;
  @Column()
  title: string;
  @Column()
  content: string;
  @Column()
  likecount: number;
  @Column()
  commentCount: number;
}
