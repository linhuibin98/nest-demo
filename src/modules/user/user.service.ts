import { Injectable } from '@nestjs/common'
import { QueryTypes } from 'sequelize'
import sequelize from '../../database/sequelize'

import { makeSalt, encryptPassword } from '../../utils/cryptogram'; // 引入加密函数

interface registerParams {
  username: string,
  password: string
}

interface ResponseData {
  code: string,
  message: string,
  data?: any
}

@Injectable()
export class UserService {
  async userRegister(params: any): Promise<any> {
    const { accountName, realName, password, repassword, mobile } = params

    if (password !== repassword) {
      return {
        code: '0',
        message: '两次密码输入不一致'
      }
    }

    const user = await this.findOne(accountName)

    if (user.code === '1') { // 用户已经存在
      return {
        code: '400',
        message: '用户已存在'
      }
    }

    const salt = makeSalt(); // 制作密码盐
    const hashPwd = encryptPassword(password, salt);  // 加密密码
    console.log('新用户注册' ,`(${accountName}, ${realName}, ${hashPwd}, ${salt}, ${mobile}, 1, 1, 0)`)
    const userRegisterSQL = `
      INSERT INTO admin_user 
      (account_name, real_name, passwd, passwd_salt, mobile, user_status, role, create_by)
      VALUES ('${accountName}', '${realName}', '${hashPwd}', '${salt}', '${mobile}', 1, 1, 0)
    `
    try {
      await sequelize.query(userRegisterSQL, { logging: false })

      return {
        code: '1',
        message: '',
        data: {
          accountName,
          realName,
          mobile
        }
      }
    } catch (error) {
      return {
        code: '503',
        message: `Service error: ${error}`
      }
    }
  }

  async findOne(username: string): Promise<any> {
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
          code: '0',
          message: '用户不存在'
        }
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}
