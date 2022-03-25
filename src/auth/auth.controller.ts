import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "@app/auth/auth.service";
import { CreateUserDto } from "@app/users/dto/create-user.dto";
import { AuthLoginDto } from "@app/auth/dto/auth-email-login.dto";

@Controller("auth")
export class AuthController {
	constructor(public service: AuthService) {
	}

	@Post("register")
	@HttpCode(HttpStatus.CREATED)
	async register(@Body() user: CreateUserDto) {
		return this.service.register(user);
	}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	public async login(@Body() creds: AuthLoginDto) {
		return this.service.validateLogin(creds);
	}
}
