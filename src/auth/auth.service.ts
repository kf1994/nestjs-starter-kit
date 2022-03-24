import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "@app/users/dto/create-user.dto";
import { UsersService } from "@app/users/users.service";
import { User } from "@app/users/users.entity";

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
	) {
	}

	async register(user: CreateUserDto): Promise<User> {
		return await this.usersService.create(user);
	}
}
