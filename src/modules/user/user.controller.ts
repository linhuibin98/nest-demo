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
  userRegister(@Body() { username, password }): ResponseData {
    return this.userService.userRegister({username, password})
  }

  @Get('/find')
  findOne(@Query('username') username) {
    return this.userService.findOne(username)
  }

}
