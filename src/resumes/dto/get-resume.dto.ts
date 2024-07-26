import { IsNumber, IsNotEmpty } from 'class-validator';

export class GetResumeDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
