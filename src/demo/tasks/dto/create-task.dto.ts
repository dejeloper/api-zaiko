import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsInt,
  IsPositive,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  title: string;

  @IsString()
  @MinLength(5)
  @MaxLength(250)
  @IsOptional()
  description?: string;

  @IsInt()
  @IsPositive()
  state: number;
}
