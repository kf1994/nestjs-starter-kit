import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Task } from "./tasks.entity";
import { ITask } from "@app/tasks/interfaces/task.interface";
import { CreateTaskDto } from "@app/tasks/dto/create-task.dto";
import { UpdateTaskDto } from "@app/tasks/dto/update-task.dto";


@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(Task) private readonly repo: Repository<Task>,
	) {}

	public async find(): Promise<ITask[] | null> {
		return await this.repo.find();
	}

	public async findByID(id: number): Promise<ITask | null> {
		return await this.repo.findOne(id);
	}

	public async create(data: CreateTaskDto): Promise<ITask | null> {
		const task =  this.repo.create(data);
		return await this.repo.save(task);
	}

	public async update(id: number, data: UpdateTaskDto): Promise<string> {
		const result = await this.repo.update(id, data);

		if (!result?.affected) return "Unable to update!";

		return "Successfully updated!";
	}

	public async delete(id: number): Promise<string> {
		const result = await this.repo.delete(id);

		if (!result?.affected) return "Unable to delete!";

		return "Successfully deleted!";
	}
}
