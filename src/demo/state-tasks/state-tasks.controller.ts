import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StateTasksService } from './state-tasks.service';
import { CreateStateTaskDto } from './dto/create-state-task.dto';
import { UpdateStateTaskDto } from './dto/update-state-task.dto';

@Controller('state-tasks')
export class StateTasksController {
  constructor(private readonly stateTasksService: StateTasksService) {}

  @Post()
  create(@Body() createStateTaskDto: CreateStateTaskDto) {
    return this.stateTasksService.create(createStateTaskDto);
  }

  @Get()
  findAll() {
    return this.stateTasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.stateTasksService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateStateTaskDto: UpdateStateTaskDto,
  ) {
    return this.stateTasksService.update(id, updateStateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.stateTasksService.remove(id);
  }
}
