import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from 'src/database/entities/skill.entity';
import { ResumesModule } from 'src/resumes/resumes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Skill]), ResumesModule],
  controllers: [SkillsController],
  providers: [SkillsService],
})
export class SkillsModule {}
