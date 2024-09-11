import {
  BadRequestException,
  Body,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ email, password, userName, role }: RegisterDto) {
    await this.userService.create({
      email,
      userName,
      role,
      password: await bcryptjs.hash(password, 10),
    });

    const registerUser = { userName, role };

    return registerUser;
  }

  async login({ userName, password }: LoginDto) {
    const user = await this.userService.findOneByUserName(userName);
    if (!user) {
      throw new UnauthorizedException(`UserName ${userName} is wrong`);
    }

    const isValidPassword = await bcryptjs.compare(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException(`Password is wrong`);
    }

    const payload = { userName: user.userName, role: user.role };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      userName,
    };
  }

  async profile({ userName, role }: { userName: string; role: string }) {
    return await this.userService.findOneByUserName(userName);
  }
}
