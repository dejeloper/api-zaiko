import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateStateTaskDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: string;
}
