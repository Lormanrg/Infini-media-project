import {
  BadRequestException,
  HttpCode,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { isValidObjectId, Model } from 'mongoose';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userModel.create(createUserDto);

      return user;
    } catch (error) {
      console.log(error);
      if (error.code === 11000) {
        throw new BadRequestException(
          `UserName or Email ${JSON.stringify(error.keyValue)} already exist in DB `,
        );
      } else {
        throw new InternalServerErrorException(
          `Can't create user - Check server logs`,
        );
      }
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(term: string) {
    let user: User;

    //Validando MongoID
    if (!user && isValidObjectId(term)) {
      user = await this.userModel.findById(term);
    }

    // Validando userName
    if (!user) {
      user = await this.userModel.findOne({
        userName: term.trim(),
      });
    }

    if (!user) {
      throw new NotFoundException(`User with id or name ${term} not found`);
    }
    return user;
  }

  update(term: string, updateUserDto: UpdateUserDto) {
    const user = this.findOne(term);

    if (user) {
    }

    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
