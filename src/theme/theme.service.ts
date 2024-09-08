import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Theme } from './entities/theme.entity';

@Injectable()
export class ThemeService {
  constructor(
    @InjectModel(Theme.name)
    private readonly themeModel: Model<Theme>,
  ) {}
  async create(createThemeDto: CreateThemeDto) {
    try {
      createThemeDto.name = createThemeDto.name.toLocaleLowerCase();

      const theme = await this.themeModel.create(createThemeDto);
      return theme;
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all theme`;
  }

  async findOne(id: string) {
    const theme = await this.themeModel.findById(id);

    if (!theme) {
      throw new NotFoundException(`Theme with ${id} not found`);
    }

    return theme;
  }

  update(id: string, updateThemeDto: UpdateThemeDto) {
    return `This action updates a #${id} theme`;
  }

  remove(id: string) {
    return `This action removes a #${id} theme`;
  }
}
