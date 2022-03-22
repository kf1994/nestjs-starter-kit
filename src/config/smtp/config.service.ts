import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class SMTPConfigService {
	constructor(private configService: ConfigService) {
	}

	get host(): string {
		return this.configService.get<string>("smtp.host");
	}

	get port(): number {
		return Number(this.configService.get<number>("smtp.port"));
	}

	get user(): string {
		return this.configService.get<string>("smtp.user");
	}

	get password(): string {
		return this.configService.get<string>("smtp.password");
	}
}
