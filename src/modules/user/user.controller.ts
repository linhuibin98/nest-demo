import { Controller, Get, Post, Body, Query } from '@nestjs/common'
import { UserService } from './user.service'

interface ResponseData {
  code: string,
  message: string,
  data: any
}

@Controller('user')
export class UserController {
  constructor(private readonly userService : UserService) {}

  @Post('/register')
  userRegister(@Body() body): any {
    return this.userService.userRegister(body)
  } 

  @Get('/find')
  findOne(@Query('username') username): any {
    return this.userService.findOne(username)
  }

}
