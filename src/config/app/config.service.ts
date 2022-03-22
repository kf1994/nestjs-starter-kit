import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppConfigService {
	constructor(private configService: ConfigService) {
	}

	get name(): string {
		return this.configService.get<string>("app.name");
	}

	get maintenance(): boolean {
		return this.configService.get<boolean>("app.maintenance");
	}

	get env(): string {
		return this.configService.get<string>("app.env");
	}

	get url(): string {
		return this.configService.get<string>("app.url");
	}

	get host(): string {
		return this.configService.get<string>("app.host");
	}

	get port(): number {
		return Number(this.configService.get<number>("app.port"));
	}

	get jwtSecret(): string {
		return this.configService.get<string>("app.jwtSecret");
	}
}
