import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Resume } from './resume.entity';
import { SkillLevelEnum } from 'src/enums/skill-level.enum';
import { SkillCategoryEnum } from 'src/enums/skill-category.enum';

@Entity('skill')
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, nullable: false })
  name: string;

  @Column({ type: 'enum', enum: SkillLevelEnum, nullable: false })
  level: SkillLevelEnum;

  @Column({ type: 'enum', enum: SkillCategoryEnum, nullable: false })
  category: SkillCategoryEnum;

  @Column({ type: 'varchar', length: 16300, nullable: false })
  link: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Resume, (resume) => resume.skills)
  resume: Resume;
}
