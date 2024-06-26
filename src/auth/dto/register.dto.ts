import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  phone: string

  @IsString()
  address: string

  @IsString()
  bio: string
}
