import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import config from '@config/app.config';
import authConfig from '@config/auth.config';
import dbConfig from '@config/database.config';
import { TypeOrmConfigService } from '@core/database/database.module';
import { CoreService } from '@core/core.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config, dbConfig, authConfig],
      envFilePath: [CoreService.envConfiguration()],
    }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'uploads') }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'assets'), serveRoot: '/assets' }),
    MulterModule.register({ dest: join(__dirname, '..', 'uploads') }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
  ],
  providers: [CoreService],
})
export class CoreModule {}
