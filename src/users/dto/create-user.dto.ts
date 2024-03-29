import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  state?: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  role?: number;

  @IsBoolean()
  @IsOptional()
  changePassword?: boolean;

  @IsBoolean()
  @IsOptional()
  enable?: boolean;

  @IsString()
  @IsOptional()
  userCreatedAt?: string;

  @IsString()
  @IsOptional()
  userUpdateAt?: string;
}
