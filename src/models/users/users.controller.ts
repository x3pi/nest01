import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorator/public.decorator';
import { User } from './schemas/users.schema';
import * as bcrypt from 'bcrypt';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = new User();
    user.username = createUserDto.username;
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
    user.password = hash;
    const isMatch = await bcrypt.compare(createUserDto.password, hash);
    console.log(isMatch);
    const isMatch2 = await bcrypt.compare(
      'string',
      '$2b$10$PXxlCIYwnR9CFpyhIeoNduVj90fM.xT.ndijPt4sR.0e.C.tKTFQq',
    );
    console.log(isMatch2);
    return this.usersService.create(user);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') username: string) {
    return this.usersService.findOne(username);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
