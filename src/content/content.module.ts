import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Content, contentSchema } from './entities/content.entity';
import { ThemeModule } from 'src/theme/theme.module';
import { ThemeService } from 'src/theme/theme.service';
import { Theme, themeSchema } from 'src/theme/entities/theme.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Content.name,
        schema: contentSchema,
      },
      {
        name: Theme.name,
        schema: themeSchema,
      },
    ]),
  ],
  controllers: [ContentController],
  providers: [ContentService, ThemeService],
})
export class ContentModule {}
