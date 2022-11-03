import { HttpException } from "@nestjs/common";

export class InvalidCredentials extends HttpException {
	constructor() {
		super("username & password does not match!", 403);
	}
}
