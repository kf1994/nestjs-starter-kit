import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "@app/users/users.entity";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private repo: Repository<User>,
	) {
	}

	async create(user: CreateUserDto) {
		return await this.repo.save(
			this.repo.create(user),
		);
	}
}
