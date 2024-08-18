import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEmail()
  @IsOptional()
  businessEmail: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  github: string;

  @IsString()
  @IsOptional()
  linkedin: string;

  @IsString()
  @IsOptional()
  instagram: string;

  @IsString()
  @IsOptional()
  twitter: string;

  @IsString()
  @IsOptional()
  google: string;

  @IsString()
  @IsOptional()
  youtube: string;

  @IsString()
  @IsOptional()
  facebook: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  bio: string;
}
