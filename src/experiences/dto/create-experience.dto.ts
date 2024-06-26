import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateExperienceDto {
  @IsNumber()
  @IsNotEmpty()
  resumeId: number
  companyName: string

  @IsString()
  @IsNotEmpty()
  role: string

  @IsString()
  @IsNotEmpty()
  startDate: Date

  @IsString()
  @IsOptional()
  endDate: Date

  @IsString()
  @IsOptional()
  description: string
}
