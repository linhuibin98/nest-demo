import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as express from 'express'
import { logger } from './middleware/logger.middleware'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 处理请求参数
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
  // 监听所有的请求路由，并打印日志
  app.use(logger);

  // 设置全局路由前缀
  // app.setGlobalPrefix('nest-zero-to-one');
  await app.listen(3000);
}
bootstrap();
