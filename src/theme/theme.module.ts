import { Module } from '@nestjs/common';
import { ThemeService } from './theme.service';
import { ThemeController } from './theme.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { Theme, themeSchema } from './entities/theme.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Theme.name,
        schema: themeSchema,
      },
    ]),
  ],
  controllers: [ThemeController],
  providers: [ThemeService],
  exports: [ThemeService],
})
export class ThemeModule {}
