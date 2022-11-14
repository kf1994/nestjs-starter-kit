import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@core/utils/base.entity';
import { CreateTaskDto } from '@app/tasks/dto/create-task.dto';
import { ITask } from './dto/task.dto';

@Entity()
export class Task extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  fromDto(payload: CreateTaskDto): Task {
    this.title = payload.title;
    this.description = payload.description;

    return this;
  }

  toJSON(task: Task): ITask {
    const { deletedAt, ...rest } = task;
    return rest;
  }
}
