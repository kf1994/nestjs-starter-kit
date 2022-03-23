import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Tasks } from "./tasks.entity";
import { ITask } from "@app/tasks/interfaces/task.interface";
import { CreateTaskDto } from "@app/tasks/dto/create-task.dto";


@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(Tasks) private readonly repo: Repository<Tasks>,
	) {}

	public async find(): Promise<ITask[] | null> {
		return await this.repo.find();
	}
	//
	// public async findByID(id): Promise<Tasks | null> {
	// 	return await this.repo.findOne(id);
	// }

	public async create(data: CreateTaskDto): Promise<ITask | null> {
		const task =  this.repo.create(data);
		return await this.repo.save(task);
	}
}
