import { Controller, Get, Request, Response } from "@nestjs/common";

import { IndexService } from "./index.service";

@Controller()
export class IndexController {
	constructor(private readonly service: IndexService) {
	}

	@Get()
	getHello(): string {
		return this.service.getHello();
	}

	@Get("/favicon.ico")
	getFavicon(@Request() req, @Response() res) {
		return res.status(204).send();
	}
}
