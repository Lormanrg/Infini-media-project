import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { ContentModule } from './content/content.module';
import { ThemeModule } from './theme/theme.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    MongooseModule.forRoot('mongodb://localhost:27018/nest-media-app'),
    UsersModule,
    CommonModule,
    ContentModule,
    ThemeModule,
    AuthModule,
  ],
})
export class AppModule {}
