import { Injectable } from '@nestjs/common'
import { QueryTypes } from 'sequelize'
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
  }

  async findOne(username: string): Promise<any | undefined> {
    const sql: string = `
      SELECT user_id, account_name, real_name, mobile, user_status
      FROM admin_user 
      WHERE
      account_name = '${username}';
    `
    try {
      const res = await sequelize.query(sql, {
        type: QueryTypes.SELECT, // 查询方式
        raw: true, // 是否使用数组组装的方式展示结果
      })

      console.log('数据库查询结果：', res)
      const user = res[0]
      if (user) {
        return {
          code: '1',
          message: 'success',
          data: user
        }
      } else {
        return {
          code: '1',
          message: '用户不存在',
          data: ''
        }
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}
