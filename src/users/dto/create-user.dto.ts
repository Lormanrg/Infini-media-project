import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  userName: string;
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @MinLength(5)
  password: string;

  @IsString()
  role: string;
}
