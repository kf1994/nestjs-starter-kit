import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { MulterModule } from "@nestjs/platform-express";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import config from '@config/app.config';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [config],
			envFilePath: ['.env'],
		}),
		ServeStaticModule.forRoot({ rootPath: join(__dirname, "..", "uploads") }),
		ServeStaticModule.forRoot({ rootPath: join(__dirname, "..", "assets"), serveRoot: "/assets" }),
		MulterModule.register({ dest: join(__dirname, "..", "uploads") })
	]
})
export class CoreModule {}
