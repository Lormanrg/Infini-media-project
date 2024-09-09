import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  userName: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(5)
  password: string;
}
