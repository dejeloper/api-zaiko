import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateTasksService } from './state-tasks.service';
import { StateTasksController } from './state-tasks.controller';
import { StateTask } from './entities/state-task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StateTask])],
  controllers: [StateTasksController],
  providers: [StateTasksService],
  exports: [TypeOrmModule],
})
export class StateTasksModule {}
