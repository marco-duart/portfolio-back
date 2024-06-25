import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { PortfolioItemPhoto } from "./portfolio-item-photo.entity";

@Entity('portfolio_item')
export class PortfolioItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, nullable: false })
  name: string

  @Column({ type: 'text', nullable: false })
  description: string

  @Column({ type: 'varchar', length: 128, nullable: false })
  technologies: string

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => PortfolioItemPhoto, (photos) => photos.portfolio, { onDelete: 'CASCADE' })
  photos: PortfolioItemPhoto[];

  @ManyToOne(() => User, (user) => user.portfolioItems)
  user: User;
}