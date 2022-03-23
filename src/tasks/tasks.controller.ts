import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { TasksService } from "@app/tasks/tasks.service";
import { ITask } from "@app/tasks/interfaces/task.interface";
import { CreateTaskDto } from "@app/tasks/dto/create-task.dto";
import { UpdateTaskDto } from "@app/tasks/dto/update-task.dto";

@Controller("tasks")
export class TasksController {
	constructor(private service: TasksService) {
	}

	@Post()
	async create(@Body() task: CreateTaskDto): Promise<ITask | null> {
		return await this.service.create(task);
	}

	@Get()
	async find(): Promise<ITask[] | null> {
		return await this.service.find();
	}

	@Get("/:id")
	async findOne(@Param("id") id: number): Promise<ITask | null> {
		return await this.service.findByID(id);
	}

	@Put("/:id")
	async update(@Param("id") id: number, @Body() task: UpdateTaskDto): Promise<string> {
		return await this.service.update(id, task);
	}
}
