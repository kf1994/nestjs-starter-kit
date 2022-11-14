import { Body, Controller, Post } from '@nestjs/common';
import { TasksService } from '@app/tasks/tasks.service';
import { ITask } from '@app/tasks/interfaces/task.interface';
import { CreateTaskDto } from '@app/tasks/dto/create-task.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Task')
@Controller('tasks')
export class TasksController {
  constructor(private service: TasksService) {}

  @Post()
  async create(@Body() task: CreateTaskDto): Promise<ITask | null> {
    return await this.service.create(task);
  }
}
