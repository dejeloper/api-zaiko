import {
  ConflictException, // 409
  NotFoundException, // 404
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { StateTask } from 'src/demo/state-tasks/entities/state-task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    @InjectRepository(StateTask)
    private readonly stateTaskRepository: Repository<StateTask>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const taskFound = await this.taskRepository.findOne({
      where: {
        title: createTaskDto.title,
      },
    });

    if (taskFound) {
      throw new ConflictException('La tarea ya existe');
    }

    const stateTaskFound = await this.stateTaskRepository.findOne({
      where: {
        id: createTaskDto.state,
      },
    });

    if (!stateTaskFound) {
      throw new NotFoundException('El estado de la tarea no existe');
    }

    const task = this.taskRepository.create({
      ...createTaskDto,
      state: stateTaskFound,
    });
    return await this.taskRepository.save(task);
  }

  async findAll() {
    const tasks = await this.taskRepository.find();
    if (tasks.length === 0) {
      throw new NotFoundException('No hay tareas');
    }
    return tasks;
  }

  async findOne(id: number) {
    const taskFound = await this.taskRepository.findOneBy({ id });

    if (!taskFound) {
      throw new NotFoundException('La tarea no existe');
    }

    return taskFound;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const taskFound = await this.taskRepository.findOneBy({ id });

    if (!taskFound) {
      throw new NotFoundException('La tarea no existe');
    }

    const stateTaskFound = await this.stateTaskRepository.findOne({
      where: {
        id: updateTaskDto.state,
      },
    });

    if (!stateTaskFound) {
      throw new NotFoundException('El estado de la tarea no existe');
    }

    return await this.taskRepository.update(
      { id },
      {
        ...updateTaskDto,
        state: stateTaskFound,
      },
    );
  }

  async remove(id: number) {
    const taskFound = await this.taskRepository.findOneBy({ id });

    if (!taskFound) {
      throw new NotFoundException('La tarea no existe');
    }

    return await this.taskRepository.softDelete({ id });
  }
}
