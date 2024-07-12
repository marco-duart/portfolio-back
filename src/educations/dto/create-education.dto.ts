import { IsNumber, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EducationDegreeEnum } from 'src/enums/education-degree.enum';

export class CreateEducationDto {
  @IsNumber()
  @IsNotEmpty()
  resumeId: number;

  @IsString()
  @IsNotEmpty()
  institutionName: string;

  @IsString()
  @IsNotEmpty()
  degree: EducationDegreeEnum;

  @IsString()
  @IsNotEmpty()
  startDate: Date;

  @IsString()
  @IsOptional()
  endDate: Date;

  @IsString()
  @IsOptional()
  description: string;
}
