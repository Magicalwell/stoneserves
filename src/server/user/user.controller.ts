import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ResultData } from '../../utils/result';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('usersinfo')
  findAll(@Body() dto): Promise<ResultData> {
    return this.userService.login(dto);
  }
}
