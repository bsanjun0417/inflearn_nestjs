import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  NotFoundException,
  Param,
  Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get()  
  getPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id') // posts/:id 인거
  getPost(@Param('id') id: string) {
    return this.postsService.getPostById(+id); // 묵시적 형변환 해서 넣기
  }

  @Post() //POST /posts 글쓰기생성
  postPost(
    @Body('authorId') authorId: number,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    return this.postsService.createPost(authorId, title, content);
  }

  @Put(':id')
  //변경할려는거
  putPost(
    //선택이 될수 있게  ? 붙여줌
    @Param('id') id: string, //url로 넣어줌
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    return this.postsService.updatePost(+id, title, content);
  }

  //post삭제
  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(+id);
  }
}
