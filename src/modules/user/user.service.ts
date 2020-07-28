import { Injectable } from '@nestjs/common'
import * as Sequelize from 'sequelize'
import sequelize from '../../database/sequelize'

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
  },

 async findOne(username) {
    const sql = `

    `
    await sequelize.query(sql)
  }
}
