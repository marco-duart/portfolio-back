import { Module } from '@nestjs/common';
import { EducationsService } from './educations.service';
import { EducationsController } from './educations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Education } from 'src/database/entities/education.entity';
import { ResumesModule } from 'src/resumes/resumes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Education]), ResumesModule],
  controllers: [EducationsController],
  providers: [EducationsService],
})
export class EducationsModule {}
