import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Experience } from "./experience.entity";
import { Education } from "./education.entity";
import { Skill } from "./skill.entity";

@Entity('resume')
export class Resume {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 64, nullable: false })
  title: string

  @Column({ type: 'text', nullable: false })
  summary: string

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.resume, { nullable: false })
  user: User;

  @OneToMany(() => Experience, (experience) => experience.resume, { onDelete: 'CASCADE' })
  experiences: Experience[];

  @OneToMany(() => Education, (education) => education.resume, { onDelete: 'CASCADE' })
  educations: Education[];

  @OneToMany(() => Skill, (skill) => skill.resume, { onDelete: 'CASCADE' })
  skills: Skill[];
}