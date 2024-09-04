import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Resume } from './resume.entity';
import { PortfolioItem } from './portfolio-item.entity';
import { BadRequestException } from '@nestjs/common';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  businessEmail: string

  @Column({ type: 'varchar', length: 64, nullable: false, select: false })
  password: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  whatsapp: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  github: string

  @Column({ type: 'varchar', length: 100, nullable: true })
  linkedin: string

  @Column({ type: 'varchar', length: 100, nullable: true })
  instagram: string

  @Column({ type: 'varchar', length: 100, nullable: true })
  threads: string

  @Column({ type: 'varchar', length: 100, nullable: true })
  google: string

  @Column({ type: 'varchar', length: 100, nullable: true })
  youtube: string

  @Column({ type: 'varchar', length: 100, nullable: true })
  facebook: string

  @Column({ type: 'varchar', length: 128, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  bioTitle: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Resume, (resume) => resume.user)
  @JoinColumn()
  resume: Resume;

  @OneToMany(() => PortfolioItem, (portfolioItems) => portfolioItems.user, {
    onDelete: 'CASCADE',
  })
  portfolioItems: PortfolioItem[];

  @BeforeInsert()
  async hashPassword() {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error with password hash.');
    }
  }
}
