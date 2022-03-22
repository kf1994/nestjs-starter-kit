import { Controller, Get, Request, Response } from "@nestjs/common";

import { AppService } from "./app.service";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {
	}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@Get("/favicon.ico")
	getFavicon(@Request() req, @Response() res) {
		return res.status(204).send();
	}
}
