import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CatsService } from './cats/cats.service';
import { Cat } from './cats/schemas/cat.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly catsService: CatsService) {}

  @Get(":id")
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
