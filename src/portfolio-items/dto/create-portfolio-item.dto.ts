import { IsNumber, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreatePortfolioItemDto {
  @IsNumber()
  @IsNotEmpty()
  resumeId: number

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
