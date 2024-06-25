import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Resume } from "./resume.entity";
import { EducationDegreeEnum } from "src/enums/education-degree.enum";

@Entity('education')
export class Education {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, nullable: false })
  institution_name: string

  @Column({ type: 'enum', enum: EducationDegreeEnum, nullable: false })
  degree: EducationDegreeEnum

  @Column({ type: 'date', nullable: true })
  start_date: Date

  @Column({ type: 'date', nullable: true })
  end_date: Date

  @Column({ type: 'text', nullable: false })
  description: string

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Resume, (resume) => resume.educations)
  resume: Resume;
}