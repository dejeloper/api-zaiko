import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';
import { StateTasksModule } from 'src/demo/state-tasks/state-tasks.module';
import { StateTasksService } from 'src/demo/state-tasks/state-tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), StateTasksModule],
  controllers: [TasksController],
  providers: [TasksService, StateTasksService],
})
export class TasksModule {}
