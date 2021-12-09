import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware, LoggerMiddleware2} from './common/middleware/logger.middleware';

let Throttler = ThrottlerModule.forRoot({
  ttl: 60,
  limit: 10,
});

@Module({
  imports: [CatsModule, Throttler],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, LoggerMiddleware2)
      .forRoutes('cats');
  }
}
