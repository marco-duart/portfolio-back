import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class CreateResumeDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  summary: string;
}
