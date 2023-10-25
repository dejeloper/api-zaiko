import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateUserStateDto {
  @IsString()
  'name': string;

  @IsBoolean()
  @IsOptional()
  'enable': boolean;

  @IsString()
  @IsOptional()
  'userCreatedAt': string;

  @IsString()
  @IsOptional()
  'userUpdateAt': string;
}
