import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Resume } from './resume.entity';
import { EducationDegreeEnum } from 'src/enums/education-degree.enum';

@Entity('education')
export class Education {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, nullable: false })
  institutionName: string;

  @Column({ type: 'enum', enum: EducationDegreeEnum, nullable: false })
  degree: EducationDegreeEnum;

  @Column({ type: 'date', nullable: false })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Resume, (resume) => resume.educations)
  resume: Resume;
}
