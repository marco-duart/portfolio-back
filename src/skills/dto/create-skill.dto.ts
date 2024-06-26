import { IsNumber, IsNotEmpty, IsString } from "class-validator"
import { SkillLevelEnum } from "src/enums/skill-level.enum";


export class CreateSkillDto {
  @IsNumber()
  @IsNotEmpty()
  resumeId: number

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  level: SkillLevelEnum
}
