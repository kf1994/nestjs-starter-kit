import { Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import { CreateUserDto } from "@app/users/dto/create-user.dto";
import { UsersService } from "@app/users/users.service";
import { User } from "@app/users/users.entity";
import { AuthLoginDto } from "@app/auth/dto/auth-email-login.dto";
import { JwtService } from "@nestjs/jwt";
import { InvalidCredentials } from "@core/exceptions";
import { randomStringGenerator } from "@nestjs/common/utils/random-string-generator.util";
import { ForgotService } from "@app/forgot/forgot.service";
import moment from "moment";
import has = Reflect.has;

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private usersService: UsersService,
		private forgotService: ForgotService,
	) {
	}

	async register(user: CreateUserDto): Promise<User> {
		const hash = crypto
			.createHash("sha256")
			.update(randomStringGenerator())
			.digest("hex");

		// TODO: Send hash to user via email
		return await this.usersService.create({ ...user, hash });
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

	async confirmEmail(hash: string): Promise<void> {
		const user = await this.usersService.findOne({ hash });

		if (!user) {
			throw new NotFoundException("Confirmation hash is not valid. Please make sure the confirmation hash is valid!");
		}

		user.hash = null;
		user.emailVerified = true;

		await user.save();
	}

	async forgotPassword(email: string): Promise<void> {
		const user = await this.usersService.findOne({ email });

		if (!user) {
			throw new NotFoundException("User with this email does not exists!");
		}

		const hash = await this.forgotService.findOne({ where: { user: user.id } });
		if (hash && moment().diff(moment(hash.createdAt), 'hours') <= 8) {
			return;
		} else if (hash && moment().diff(moment(hash.createdAt), 'hours') > 8) {
			await this.forgotService.softDelete(hash.id);
		}

		const newHash = crypto
			.createHash("sha256")
			.update(randomStringGenerator())
			.digest("hex");

		await this.forgotService.create({ hash: newHash, user });

		// TODO: send email to user
	}

	async resetPassword(hash: string, password: string): Promise<void> {
		const forgot = await this.forgotService.findOne({ where: { hash } });

		if (!forgot) {
			throw new NotFoundException("Confirmation hash is not valid. Please make sure the confirmation hash is valid!");
		}

		const user = forgot.user;
		user.password = password;
		await user.save();
		await this.forgotService.softDelete(forgot.id);
	}
}
