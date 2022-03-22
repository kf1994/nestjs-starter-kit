import * as Joi from "@hapi/joi";
import { Module } from "@nestjs/common";
import configuration from "./configuration";
import { SMTPConfigService } from "./config.service";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [configuration],
			validationSchema: Joi.object({
				SMTP_HOST: Joi.string(),
				SMTP_PORT: Joi.number(),
				SMTP_USER: Joi.string(),
				SMTP_PASS: Joi.string(),
			}),
		}),
	],
	providers: [ConfigService, SMTPConfigService],
	exports: [ConfigService, SMTPConfigService],
})
export class SMTPConfigModule {
}
