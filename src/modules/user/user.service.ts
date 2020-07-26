import { Injectable } from '@nestjs/common'

interface registerParams {
  username: string,
  password: string
}

interface ResponseData {
  code: string,
  message: string,
  data: any
}

@Injectable()
export class UserService {
  userRegister(params: registerParams): ResponseData {
    return {
      code: '1',
      message: 'success',
      data: {
        username: params.username,
        password: params.password,
        token: 'sdfasfajfgas54tf5'
      }
    }
  }
}
