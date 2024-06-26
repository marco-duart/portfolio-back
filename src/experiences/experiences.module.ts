import { Module } from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { ExperiencesController } from './experiences.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experience } from 'src/database/entities/experience.entity';
import { ResumesModule } from 'src/resumes/resumes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Experience]), ResumesModule],
  controllers: [ExperiencesController],
  providers: [ExperiencesService],
})
export class ExperiencesModule {}
