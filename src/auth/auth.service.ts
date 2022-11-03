import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import { CreateUserDto } from "@app/users/dto/create-user.dto";
import { UsersService } from "@app/users/users.service";
import { User } from "@app/users/users.entity";
import { AuthLoginDto } from "@app/auth/dto/auth-email-login.dto";
import { JwtService } from "@nestjs/jwt";
import { InvalidCredentials, ValidationFailed } from "@core/exceptions";
import { randomStringGenerator } from "@nestjs/common/utils/random-string-generator.util";
import { ForgotService } from "@app/forgot/forgot.service";
import moment from "moment";
import { AuthUpdateDto } from "@app/auth/dto/auth-update.dto";
import { FindOneOptions } from "typeorm/find-options/FindOneOptions";
import { Forgot } from "@app/forgot/forgot.entity";

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private usersService: UsersService,
		private forgotService: ForgotService,
	) {}

	async register(user: CreateUserDto): Promise<User> {
		const hash = crypto.createHash("sha256").update(randomStringGenerator()).digest("hex");

		// TODO: Send hash to user via email
		return await this.usersService.create({ ...user, hash });
	}

	async validateLogin(creds: AuthLoginDto): Promise<{ token: string; user: User }> {
		const user = await this.usersService.findOne({
			email: creds.email,
		});

		const isValidPassword = await bcrypt.compare(creds.password, user.password);

		if (isValidPassword) {
			const token = this.jwtService.sign({ id: user.id });
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

		if (!user) throw new NotFoundException("User with this email does not exists!");

		const hash = await this.forgotService.findOne({ where: { user: user.id } } as FindOneOptions<Forgot>);
		if (hash && moment().diff(moment(hash.createdAt), "hours") <= 8) {
			return;
		} else if (hash && moment().diff(moment(hash.createdAt), "hours") > 8) {
			await this.forgotService.softDelete(hash.id);
		}

		const newHash = crypto.createHash("sha256").update(randomStringGenerator()).digest("hex");

		await this.forgotService.create({ hash: newHash, user });

		// TODO: send email to user
	}

	async resetPassword(hash: string, password: string): Promise<void> {
		const forgot = await this.forgotService.findOne({ where: { hash } });

		if (!forgot) {
			throw new NotFoundException("Confirmation hash is not valid. Please make sure the confirmation hash is valid!");
		}

		if (moment().diff(moment(forgot.createdAt), "hours") > 8) {
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					message: "This link has been expired.",
				},
				HttpStatus.BAD_REQUEST,
			);
		}

		const user = forgot.user;
		user.password = password;
		await user.save();
		await this.forgotService.softDelete(forgot.id);
	}

	async me(user: User): Promise<User> {
		return this.usersService.findOne({ id: user.id });
	}

	async update(user: User, userDto: AuthUpdateDto): Promise<User> {
		if (userDto.password) {
			if (userDto.oldPassword) {
				const currentUser = await this.usersService.findOne({ id: user.id });

				const isValidOldPassword = await bcrypt.compare(userDto.oldPassword, currentUser.password);

				if (!isValidOldPassword) throw new InvalidCredentials();
			} else {
				throw new ValidationFailed({ oldPassword: "Previous password field is missing!" });
			}
		}

		await this.usersService.update(user.id, userDto);

		return this.usersService.findOne({ id: user.id });
	}

	async softDelete(user: User): Promise<void> {
		await this.usersService.softDelete(user.id);
	}
}
