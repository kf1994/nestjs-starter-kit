import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "@app/users/dto/create-user.dto";
import { UsersService } from "@app/users/users.service";
import { User } from "@app/users/users.entity";
import { AuthLoginDto } from "@app/auth/dto/auth-email-login.dto";
import { JwtService } from "@nestjs/jwt";
import { InvalidCredentials } from "@core/exceptions";

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private usersService: UsersService,
	) {
	}

	async register(user: CreateUserDto): Promise<User> {
		return await this.usersService.create(user);
	}

	async validateLogin(creds: AuthLoginDto): Promise<{ token: string; user: User }> {
		const user = await this.usersService.findOne({
			email: creds.email,
		});

		const isValidPassword = await bcrypt.compare(
			creds.password,
			user.password,
		);

		if (isValidPassword) {
			const token = await this.jwtService.sign({ id: user.id });
			return { token, user: user };
		} else {
			throw new InvalidCredentials();
		}
	}
}
