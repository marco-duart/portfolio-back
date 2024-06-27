import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Resume } from "./resume.entity";

@Entity('experience')
export class Experience {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column({ type: 'varchar', length: 64, nullable: false })
  companyName: string

  @Column({ type: 'varchar', length: 64, nullable: false })
  role: string

 @Column({ type: 'date', nullable: false })
  startDate: Date

  @Column({ type: 'date', nullable: true })
  endDate: Date

  @Column({ type: 'text', nullable: true })
  description: string

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Resume, (resume) => resume.experiences)
  resume: Resume;
}