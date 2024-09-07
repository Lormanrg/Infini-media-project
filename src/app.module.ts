import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { ContentModule } from './content/content.module';
import { ThemeModule } from './theme/theme.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    MongooseModule.forRoot('mongodb://localhost:27017/nest-meadi-app'),
    UsersModule,
    CommonModule,
    ContentModule,
    ThemeModule,
  ],
})
export class AppModule {}
