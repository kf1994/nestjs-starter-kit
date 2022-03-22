import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { MulterModule } from "@nestjs/platform-express";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

import { AppController } from "./app.controller";

import { DatabaseConfigService } from "./config/database/config.service";
import { AppService } from "./app.service";
import { DatabaseConfigModule } from "./config/database/config.module";
import { AppConfigModule } from "./config/app/config.module";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		ServeStaticModule.forRoot({ rootPath: join(__dirname, "..", "uploads") }),
		ServeStaticModule.forRoot({ rootPath: join(__dirname, "..", "assets"), serveRoot: "/assets" }),
		AppConfigModule,
		MulterModule.register({ dest: join(__dirname, "..", "uploads") }),
		TypeOrmModule.forRootAsync({
			imports: [DatabaseConfigModule],
			useFactory: async (databaseConfig: DatabaseConfigService) => ({
				type: databaseConfig.type,
				host: databaseConfig.host,
				port: databaseConfig.port,
				username: databaseConfig.username,
				password: databaseConfig.password,
				database: databaseConfig.database,
				synchronize: databaseConfig.synchronize,
				autoLoadEntities: databaseConfig.autoLoadEntities,
			}),
			inject: [DatabaseConfigService],
		} as TypeOrmModuleAsyncOptions),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
}
