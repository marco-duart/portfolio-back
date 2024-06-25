import { Module } from '@nestjs/common';
import { PortfolioItemsService } from './portfolio-items.service';
import { PortfolioItemsController } from './portfolio-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioItem } from 'src/database/entities/portfolio-item.entity';
import { PortfolioItemPhoto } from 'src/database/entities/portfolio-item-photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioItem, PortfolioItemPhoto])],
  controllers: [PortfolioItemsController],
  providers: [PortfolioItemsService],
})
export class PortfolioItemsModule {}
