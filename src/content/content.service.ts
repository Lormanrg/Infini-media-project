import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Content, ContentType } from './entities/content.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ThemeService } from 'src/theme/theme.service';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel(Content.name)
    private readonly contentModel: Model<Content>,

    private readonly themeService: ThemeService,
  ) {}

  async create(
    themeId: string,
    createContentDto: CreateContentDto,
  ): Promise<Content> {
    try {
      // Validar si la tematica existe inyectando themeService

      const theme = await this.themeService.findOne(themeId);

      if (!theme) {
        throw new NotFoundException(
          `Thematic with ID ${themeId} doesn't exist`,
        );
      }

      //Validar que la tematica permita el tipo de contenido
      if (createContentDto.type === ContentType.IMAGE && !theme.allowsImage) {
        throw new ConflictException(
          `Thematic with ${themeId} doesn't allow image content`,
        );
      }
      if (createContentDto.type === ContentType.VIDEO && !theme.allowsVideos) {
        throw new ConflictException(
          `Thematic with ${themeId} doesn't allow video content`,
        );
      }
      if (createContentDto.type === ContentType.TEXT && !theme.allowsTexts) {
        throw new ConflictException(
          `Thematic with ${themeId} doesn't allow text content`,
        );
      }
      //Validar que no se repita el contenido en la mista tematica
      const existingContent = await this.contentModel.findOne({
        title: createContentDto.title.toLocaleLowerCase(),
        themeId,
      });

      if (existingContent) {
        throw new ConflictException(
          `Content with title ${createContentDto.title} and ${themeId} already exist in same thematic`,
        );
      }

      //crear y guardar nuevo contenido
      createContentDto.title = createContentDto.title.toLocaleLowerCase();

      //Validar formato url basado en tipo de contenido
      if (
        createContentDto.type === ContentType.IMAGE &&
        !this.isValidImageUrl(createContentDto.url)
      ) {
        throw new ConflictException(`Invalid image url format`);
      }

      if (createContentDto.type === ContentType.VIDEO && !this.isValidVideo) {
        throw new ConflictException(`Invalid video url format`);
      }

      const content = await this.contentModel.create(createContentDto);

      return content;
    } catch (error) {
      throw error;
    }
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

  private async validateThemeExist(themeId: string): Promise<void> {}

  private isValidImageUrl(url: string): boolean {
    return /\.(jpg|jpeg|png|gif)$/.test(url);
  }

  private isValidVideo(url: string): boolean {
    return /\.(mp4|webm|ogg|mp3)$/.test(url);
  }
}
