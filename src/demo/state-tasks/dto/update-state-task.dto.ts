import { PartialType } from '@nestjs/mapped-types';
import { CreateStateTaskDto } from './create-state-task.dto';

export class UpdateStateTaskDto extends PartialType(CreateStateTaskDto) {}
