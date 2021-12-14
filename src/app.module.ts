import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './models/cats/cats.module';
import {
  LoggerMiddleware,
  LoggerMiddleware2,
} from './common/middleware/logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './authentication/auth/auth.module';
import { UsersModule } from './models/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './authentication/auth/guards/jwt-auth.guard';
import { RolesGuard } from './authentication/role/roles.guard';

const Throttler = ThrottlerModule.forRoot({
  ttl: 60,
  limit: 10,
});
const Mongo = MongooseModule.forRoot('mongodb://localhost/mydb');

@Module({
  imports: [CatsModule, Throttler, Mongo, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, LoggerMiddleware2).forRoutes('cats');
  }
}
