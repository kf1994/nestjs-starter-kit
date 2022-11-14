import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task } from './tasks.entity';
import { ITask } from '@app/tasks/interfaces/task.interface';
import { CreateTaskDto } from '@app/tasks/dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private readonly repo: Repository<Task>) {}

  public async create(data: CreateTaskDto): Promise<ITask | null> {
    const task = new Task().fromDto(data);
    await this.repo.save(task);
    return task.toJSON(task);
  }
}
