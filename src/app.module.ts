import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import {
  LoggerMiddleware,
  LoggerMiddleware2,
} from './common/middleware/logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsService } from './cats/cats.service';
import { Cat, CatSchema } from './cats/schemas/cat.schema';

const Throttler = ThrottlerModule.forRoot({
  ttl: 60,
  limit: 10,
});
const Mongo = MongooseModule.forRoot('mongodb://localhost/mydb')

@Module({
  imports: [
    CatsModule,
    Throttler,
    Mongo,
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService, CatsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, LoggerMiddleware2).forRoutes('cats');
  }
}
