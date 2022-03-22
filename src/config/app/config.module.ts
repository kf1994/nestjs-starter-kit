import * as Joi from "@hapi/joi";
import { Module } from "@nestjs/common";
import configuration from "./configuration";
import { AppConfigService } from "./config.service";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [configuration],
			validationSchema: Joi.object({
				APP_NAME: Joi.string().default("Acquire Backend"),
				MAINTENANCE: Joi.boolean().default(false),
				APP_ENV: Joi.string().valid("development", "production", "test", "provision").default("development"),
				APP_URL: Joi.string().default("http://localhost:3000/"),
				APP_HOST: Joi.string().default("http://localhost"),
				APP_PORT: Joi.number().default(3000),
				JWT_SECRET: Joi.string().default("acquire"),
			}),
		}),
	],
	providers: [ConfigService, AppConfigService],
	exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {
}
