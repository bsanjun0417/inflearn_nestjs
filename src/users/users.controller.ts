import { Body, Controller,Post ,Get} from '@nestjs/common';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {} //서비스 연결
  @Get()
  getUsers(){
    return this.usersService.getAllusers();
  }
  @Post()
  postUser(
    @Body('nickname') nickname: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.usersService.createUser(nickname,email,password)
  }
}
