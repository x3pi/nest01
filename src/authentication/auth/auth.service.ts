import { Injectable } from '@nestjs/common';
import { UsersService } from '../../models/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const isMatch = await bcrypt.compare(pass, user.password);
    if (user && isMatch) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const data = await this.usersService.findOne(user.username);
    const payload = {
      username: user.username,
      sub: user.userId,
      roles: data.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
