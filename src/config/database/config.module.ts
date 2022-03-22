import * as Joi from "@hapi/joi";
import { Module } from "@nestjs/common";
import configuration from "./configuration";
import { DatabaseConfigService } from "./config.service";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [configuration],
			validationSchema: Joi.object({
				DATABASE_TYPE: Joi.string().valid("postgres").default("postgres"),
				DATABASE_HOST: Joi.string().valid("localhost").default("localhost"),
				DATABASE_PORT: Joi.number().default(5432),
				DATABASE_USERNAME: Joi.string().default("postgres"),
				DATABASE_PASSWORD: Joi.string(),
				DATABASE_NAME: Joi.string(),
				DATABASE_SYNCHRONIZE: Joi.boolean().valid(true, false).default(true),
				DATABASE_AUTOLOADENTITIES: Joi.boolean().valid(true).default(true),
			}),
		}),
	],
	providers: [ConfigService, DatabaseConfigService],
	exports: [ConfigService, DatabaseConfigService],
})
export class DatabaseConfigModule {
}
