import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PortfolioItem } from "./portfolio-item.entity";

@Entity('portfolio_item_photo')
export class PortfolioItemPhoto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 128, nullable: false })
  photoUrl: string

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => PortfolioItem, (portfolio) => portfolio.photos)
  portfolio: PortfolioItem;
}