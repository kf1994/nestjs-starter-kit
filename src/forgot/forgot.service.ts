import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Forgot } from "./forgot.entity";
import { FindOneOptions } from "typeorm/find-options/FindOneOptions";
import { FindManyOptions } from "typeorm/find-options/FindManyOptions";

@Injectable()
export class ForgotService {
	constructor(
		@InjectRepository(Forgot)
		private repo: Repository<Forgot>,
	) {}

	async create(data: Forgot) {
		return this.repo.save(this.repo.create(data));
	}

	async findMany(options: FindManyOptions<Forgot>) {
		return this.repo.find({ where: options.where });
	}

	async findOne(options: FindOneOptions<Forgot>) {
		return this.repo.findOne({ where: options.where });
	}

	async softDelete(id: number): Promise<void> {
		await this.repo.softDelete(id);
	}
}
