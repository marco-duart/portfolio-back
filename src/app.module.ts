import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { EducationsModule } from './educations/educations.module';
import { ExperiencesModule } from './experiences/experiences.module';
import { ResumesModule } from './resumes/resumes.module';
import { SkillsModule } from './skills/skills.module';
import { PortfolioItemsModule } from './portfolio-items/portfolio-items.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    EducationsModule,
    ExperiencesModule,
    ResumesModule,
    SkillsModule,
    PortfolioItemsModule,
  ],
})
export class AppModule {}
