import { Module } from '@nestjs/common';
import { EducationsService } from './educations.service';
import { EducationsController } from './educations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Education } from 'src/database/entities/education.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Education])],
  controllers: [EducationsController],
  providers: [EducationsService],
})
export class EducationsModule {}
