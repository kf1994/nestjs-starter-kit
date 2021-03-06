import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "@app/auth/auth.service";
import { CreateUserDto } from "@app/users/dto/create-user.dto";
import { AuthLoginDto } from "@app/auth/dto/auth-email-login.dto";
import { AuthConfirmEmailDto } from "@app/auth/dto/auth-confirm-email.dto";
import { AuthForgotPasswordDto } from "@app/auth/dto/auth-forgot-password.dto";
import { AuthResetPasswordDto } from "@app/auth/dto/auth-reset-password.dto";
import { AuthGuard } from "@nestjs/passport";
import { AuthUpdateDto } from "@app/auth/dto/auth-update.dto";

@Controller("auth")
export class AuthController {
	constructor(public service: AuthService) {
	}

	@Post("register")
	@HttpCode(HttpStatus.CREATED)
	async register(@Body() user: CreateUserDto) {
		return this.service.register(user);
	}

	@Post("login")
	@HttpCode(HttpStatus.OK)
	public async login(@Body() creds: AuthLoginDto) {
		return this.service.validateLogin(creds);
	}

	@Post("email/confirm")
	@HttpCode(HttpStatus.OK)
	async confirmEmail(@Body() body: AuthConfirmEmailDto) {
		await this.service.confirmEmail(body.hash);

		return { message: "Your email has been confirmed successfully." };
	}

	@Post("forgot/password")
	@HttpCode(HttpStatus.OK)
	async forgotPassword(@Body() body: AuthForgotPasswordDto) {
		await this.service.forgotPassword(body.email);

		return { message: "Successfully sent reset link to user's email" };
	}

	@Post("reset/password")
	@HttpCode(HttpStatus.OK)
	async resetPassword(@Body() body: AuthResetPasswordDto) {
		const { hash, password } = body;
		await this.service.resetPassword(hash, password);

		return { message: "Password changed successfully!" };
	}

	@Get("me")
	@UseGuards(AuthGuard("jwt"))
	@HttpCode(HttpStatus.OK)
	public async me(@Request() request) {
		return this.service.me(request.user);
	}

	@Patch('me')
	@UseGuards(AuthGuard('jwt'))
	@HttpCode(HttpStatus.OK)
	public async update(@Request() request, @Body() userDto: AuthUpdateDto) {
		return this.service.update(request.user, userDto);
	}

	@Delete("me")
	@UseGuards(AuthGuard("jwt"))
	@HttpCode(HttpStatus.OK)
	public async delete(@Request() request) {
		await this.service.softDelete(request.user);

		return { message: "Your account has been deleted" };
	}
}
