import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { consumers } from 'stream';
import { TeamsModule } from './module/teams.module';
import { UsersModule } from './module/users.module';

import {LoggerMiddleware} from './middleware/logger.middleware'

@Module({
  imports: [UsersModule, TeamsModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule  {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/')
  }
}
