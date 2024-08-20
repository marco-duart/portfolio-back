import { IsNumber, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePortfolioItemDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  link: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  technologies: string;
}
