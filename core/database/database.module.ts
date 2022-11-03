import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { join } from "path";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
	constructor(private configService: ConfigService) {}

	createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			type: this.configService.get('database.type'),
			host: this.configService.get('database.host'),
			port: this.configService.get('database.port'),
			username: this.configService.get('database.username'),
			password: this.configService.get("database.password"),
			database: this.configService.get("database.database"),
			synchronize: this.configService.get("database.synchronize"),
			autoLoadEntities: this.configService.get("database.autoLoadEntities"),
			dropSchema: false,
			keepConnectionAlive: true,
			// logging: this.configService.get('app.env') !== 'production',
			entities: [join(__dirname, "/../../src/**/*.entity.*")],
			migrations: ["./migrations/**/*{.ts,.js}"],
			seeds: ["./seeds/**/*{.ts,.js}"],
			factories: ["./factories/**/*{.ts,.js}"],
		} as TypeOrmModuleOptions;
	}
}
