import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cat, CatDocument } from './cats/schemas/cat.schema';

@Injectable()
export class AppService {
  constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}

  getHello(): string {
    return 'Xin chao the gioi!';
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }
}
