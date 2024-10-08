import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateThemeDto {
  @IsString()
  @IsNotEmpty({ message: `Thematic is mandatory` })
  name: string;

  @IsBoolean()
  allowsImage: boolean;

  @IsBoolean()
  allowsVideos: boolean;

  @IsBoolean()
  allowsTexts: boolean;
}
