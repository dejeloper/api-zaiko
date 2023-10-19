import {
  ConflictException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStateTaskDto } from './dto/create-state-task.dto';
import { UpdateStateTaskDto } from './dto/update-state-task.dto';
import { StateTask } from './entities/state-task.entity';

@Injectable()
export class StateTasksService {
  constructor(
    @InjectRepository(StateTask)
    private readonly stateTaskRepository: Repository<StateTask>,
  ) {}

  async create(createStateTaskDto: CreateStateTaskDto) {
    const stateTaskFound = await this.stateTaskRepository.findOne({
      where: {
        name: createStateTaskDto.name,
      },
    });

    if (stateTaskFound) {
      throw new ConflictException('El estado de la tarea ya existe');
    }

    const stateTask = this.stateTaskRepository.create(createStateTaskDto);
    return await this.stateTaskRepository.save(stateTask);
  }

  async findAll() {
    const stateTasks = await this.stateTaskRepository.find();
    if (stateTasks.length === 0) {
      throw new NotFoundException('No hay estados de tareas');
    }
    return stateTasks;
  }

  async findOne(id: number) {
    const stateTaskFound = await this.stateTaskRepository.findOneBy({ id });

    if (!stateTaskFound) {
      throw new NotFoundException('El estado de la tarea no existe');
    }

    return stateTaskFound;
  }

  async update(id: number, updateStateTaskDto: UpdateStateTaskDto) {
    const stateTaskFound = await this.stateTaskRepository.findOneBy({ id });

    if (!stateTaskFound) {
      throw new NotFoundException('El estado de la tarea no existe');
    }

    return await this.stateTaskRepository.update({ id }, updateStateTaskDto);
  }

  async remove(id: number) {
    const stateTaskFound = await this.stateTaskRepository.findOneBy({ id });

    if (!stateTaskFound) {
      throw new NotFoundException('El estado de la tarea no existe');
    }

    return await this.stateTaskRepository.softDelete({ id });
  }
}
