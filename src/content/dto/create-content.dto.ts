import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUrl,
  ValidateIf,
} from 'class-validator';
import { ContentType } from '../entities/content.entity';

export class CreateContentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(ContentType)
  @IsNotEmpty()
  type: string;

  @ValidateIf(
    (o) => o.type === ContentType.IMAGE || o.type === ContentType.VIDEO,
  )
  @IsString()
  @IsUrl({}, { message: `URL must be a valid URL.` })
  url: string;

  @ValidateIf((o) => o.type === ContentType.TEXT)
  @IsString()
  text: string;

  @IsString()
  @IsNotEmpty()
  credits: string;

  @IsString()
  @IsNotEmpty()
  themeId: string;
}
