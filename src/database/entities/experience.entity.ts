import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Resume } from "./resume.entity";

@Entity('experience')
export class Experience {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column({ type: 'varchar', length: 64, nullable: false })
  company_name: string

  @Column({ type: 'varchar', length: 64, nullable: false })
  role: string

 @Column({ type: 'date', nullable: false })
  start_date: Date

  @Column({ type: 'date', nullable: true })
  end_date: Date

  @Column({ type: 'text', nullable: false })
  description: string

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Resume, (resume) => resume.experiences)
  resume: Resume;
}