import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EducationsModule } from './educations/educations.module';
import { ExperiencesModule } from './experiences/experiences.module';
import { ResumesModule } from './resumes/resumes.module';
import { SkillsModule } from './skills/skills.module';
import { PortfolioItemsModule } from './portfolio-items/portfolio-items.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    EducationsModule,
    ExperiencesModule,
    ResumesModule,
    SkillsModule,
    PortfolioItemsModule,
  ],
})
export class AppModule {}
