import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Task } from './tasks.entity';
import { TasksController } from '@app/tasks/tasks.controller';
import { TasksService } from '@app/tasks/tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  exports: [TasksService],
  providers: [TasksService],
})
export class TasksModule {}
