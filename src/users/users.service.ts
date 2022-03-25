import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "@app/users/users.entity";
import { EntityCondition } from "@core/types/entity-condition.type";

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

	findOne(fields: EntityCondition<User>) {
		return this.repo.findOne({ where: fields });
	}

	async softDelete(id: number): Promise<void> {
		await this.repo.softDelete(id);
	}
}
