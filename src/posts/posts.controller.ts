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
import { NotFoundError } from 'rxjs';
interface PostModel {
  //게시물 타입
  id: number;
  author: string;
  title: string;
  content: string;
  likecount: number;
  commentCount: number;
}
let posts: PostModel[] = [
  {
    id: 1,
    author: 'njs_offical',
    title: 'njs 민지',
    content: '메이크업 고치고 있는민지',
    likecount: 10000,
    commentCount: 333,
  },
  {
    id: 2,
    author: 'ive_offical',
    title: 'ive 장원영',
    content: '노래하는 장원영',
    likecount: 1550,
    commentCount: 310,
  },
  {
    id: 3,
    author: 'blackpink_offical',
    title: 'rose',
    content: '운동하는 로제',
    likecount: 99950,
    commentCount: 800,
  },
];
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // get /posts/:id
  //경로 파라미터라고 함 :id이런거를
  //id에 해당하는거의 포스트를 가져옴
  //id의 1넣으면 1에 해당하는거 가져옴

  @Get()
  getPosts() {
    //GET /posts
    //모든 post를 반환함
    return posts;
  }
  @Get(':id') // posts/:id 인거
  getPost(@Param('id') id: string) {
    //파라미터 받은거를 id라고 지을거다 id string타입
    //path파라미터는 별도의 작업을 하지 않으면 전부 string으로 입력됨
    let post: PostModel | undefined = posts.find((post) => post.id === +id);
    //자바스크립트는 숫자가 적힌 문자형인거에 + - 연산자를 붙이면 암묵적으로 타입 형변환이 됨
    //Number(id) 이렇게 사용하는거랑 똑같은 효과

    if (!post) {
      throw new NotFoundException();
      //언디파운드면 낫파운드 익셉션 반환
      // 상태코드404로 메시지는 낫파운드로 클라이언트에 응답됨
    }
    return post;
  }

  @Post() //POST /posts 글쓰기생성
  postPost(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    //포스트 만드는거
    const post: PostModel = {
      id: posts[posts.length - 1].id + 1,
      author, //키값과 벨류값이 동일하면 생략해도됨
      title,
      content,
      likecount: 0,
      commentCount: 0,
    };

    posts = [...posts, post];

    return post;
  }

  @Put(':id')
  //변경할려는거
  putPost(
    //선택이 될수 있게  ? 붙여줌
    @Param('id') id: string, //url로 넣어줌
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    let post: PostModel | undefined = posts.find((post) => post.id === +id);

    if (!post) {
      throw new NotFoundException();
    }
    if (author) {
      post.author = author;
    }
    if (title) {
      post.title = title;
    }
    if (content) {
      post.content = content;
    }
    posts = posts.map((prevPost) => (prevPost.id === +id ? post : prevPost));
    //포스트된 글들 정보 적힌 posts배열을 prevPost로 가져와서 하나씩 바디로 받은 id랑 같은게 있는지 찾아옵ㅁ
    //같은게 있으면 새로운 post 아니면 prePost그대로

    return post;
  }

  //post삭제
  @Delete(':id')
  deletePost(@Param('id') id: string) {
    //특정 post만 삭제
    let post: PostModel | undefined = posts.find((post) => post.id === +id);
    if (!post) {
      throw new NotFoundException();
    }
    posts = posts.filter((post) => post.id !== +id);

    return id;
  }
}
