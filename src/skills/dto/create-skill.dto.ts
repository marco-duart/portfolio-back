import { IsNumber, IsNotEmpty, IsString } from 'class-validator';
import { SkillCategoryEnum } from 'src/enums/skill-category.enum';
import { SkillLevelEnum } from 'src/enums/skill-level.enum';

export class CreateSkillDto {
  @IsNumber()
  @IsNotEmpty()
  resumeId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  level: SkillLevelEnum;

  @IsString()
  @IsNotEmpty()
  category: SkillCategoryEnum;

  @IsString()
  @IsNotEmpty()
  link: string;
}
