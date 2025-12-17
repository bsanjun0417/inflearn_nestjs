import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostsModel } from './entities/posts.entity';



@Injectable() //주입할수있다라는 뜻 : 프로바이더로 사용할거면 injectable를 작성해야됨 그래야 module.ts에서 작동됨 이것도 같이 작성
export class PostsService {
  constructor(
    //Repository typeorm에서 불러올수 있는 타입 ,하나의 제너릭을 받고 어떤 모델인지 작성
    @InjectRepository(PostsModel) //의존성 주입
    private readonly postsRepository: Repository<PostsModel>,
  ) {}
  async getAllPosts() {
    return this.postsRepository.find({
      relations:[// 현재 모델과 관련된 엔티티 관련된 테이블 같이 가져오기
        'author'
      ]
    }); //async비동기임
  }
  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({
      //비동기니까
      where: {
        id: id,
      },
      relations:[
        'author'
      ]
    });
    //한개의 데이터를 찾기
    if (!post) {
      //
      throw new NotFoundException();
    }
    return post;
  }

  async createPost(authorId: number, title: string, content: string) {
    //포스트 만드는거
    const post = this.postsRepository.create({
      author:{
          id:authorId,
      },
      title,
      content,
      likecount: 0,
      commentCount: 0,
    });

    const newPost = await this.postsRepository.save(post);

    return newPost;
  }

  async updatePost(
    postId: number,
    title: string,
    content: string,
  ) {
    const post = await this.postsRepository.findOne({
      where: {
        id: postId,
      },
    });
    //  console.log(post) 요청온 id의 값이랑 해당하는 객체가져옴
    if (!post) {
      throw new NotFoundException();
    }

    if (title) {
      post.title = title;
    }
    if (content) {
      post.content = content;
    }
    const newPost = await this.postsRepository.save(post);
    return post;
  }

  async deletePost(postId: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id: postId,
      },
    });
    if (!post) {
      throw new NotFoundException();
    }

    await this.postsRepository.delete(postId);

    return `id:${postId} delete`;
  }
}
