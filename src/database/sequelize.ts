import { Sequelize } from 'sequelize'
import db from '../../config/db'

const { mysql } = db

// 连接 mysql 数据库
const sequelize = new Sequelize(
  mysql.database,
  mysql.username,
  mysql.password, {
  host: mysql.host,
  port: mysql.port,
  dialect: 'mysql', // 什么数据库
  pool: {
    max: mysql.connectionLimit, // 连接池中最大连接数量
    min: 0, // 连接池中最小连接数量
    acquire: 30000,
    idle: 10000, // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
  },
  timezone: '+08:00', // 东八时区
})

// 测试数据库链接 是否成功

sequelize.authenticate()
  .then(() => {
    console.log('数据库连接成功')
  })
  .catch((err: any) => {
    console.log(err)
    throw err
  })


export default sequelize