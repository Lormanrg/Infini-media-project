import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Model } from 'mongoose';
import { Content } from './entities/content.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ThemeService } from 'src/theme/theme.service';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel(Content.name)
    private readonly contentModel: Model<Content>,

    private readonly themeService: ThemeService,
  ) {}

  async create(createContentDto: CreateContentDto): Promise<Content> {
    // Validar si la tematica existe inyectando themeService
    const { themeId, title } = createContentDto;

    const theme = await this.themeService.findOne(themeId);

    if (!theme) {
      throw new NotFoundException(`Thematic with ID ${themeId} doesn't exist`);
    }

    //Validar que no se repita el contenido en la mista tematica
    const existingContent = await this.contentModel.findOne({ title, themeId });
    if (existingContent) {
      throw new ConflictException(
        `Content with title ${title} and ${themeId} already exist in same thematic`,
      );
    }

    //crear y guardar nuevo contenido
    createContentDto.title = createContentDto.title.toLocaleLowerCase();

    const content = await this.contentModel.create(createContentDto);
    // return createContentDto.save();
    return content;
  }

  findAll() {
    return `This action returns all content`;
  }

  findOne(id: string) {
    return `This action returns a #${id} content`;
  }

  update(id: string, updateContentDto: UpdateContentDto) {
    return `This action updates a #${id} content`;
  }

  remove(id: string) {
    return `This action removes a #${id} content`;
  }
}
