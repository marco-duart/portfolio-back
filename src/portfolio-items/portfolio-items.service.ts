import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePortfolioItemDto } from './dto/create-portfolio-item.dto';
import { UpdatePortfolioItemDto } from './dto/update-portfolio-item.dto';
import { ConfigService } from '@nestjs/config';
import { PortfolioItem } from 'src/database/entities/portfolio-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PortfolioItemPhoto } from 'src/database/entities/portfolio-item-photo.entity';

@Injectable()
export class PortfolioItemsService {
  constructor(
    @InjectRepository(PortfolioItem)
    private portfolioItemsRepository: Repository<PortfolioItem>,
    @InjectRepository(PortfolioItemPhoto)
    private portfolioItemPhotosRepository: Repository<PortfolioItemPhoto>,
    private configService: ConfigService,
  ) {}

  create(createPortfolioItemDto: CreatePortfolioItemDto) {
    return 'This action adds a new portfolioItem';
  }

  findAll() {
    return `This action returns all portfolioItems`;
  }

  async findOne(id: number) {
    try {
    const portfolioItem = await this.portfolioItemsRepository.findOne({
      where: { id },
      relations: {
        photos: true,
      },
    });

    if (!portfolioItem) {
      throw new NotFoundException(`A portfolio item with this id: ${id} not found.`);
    }

    return portfolioItem
  } catch (error) {
    console.log(error);

    throw new HttpException(error.message, error.status);
  }
  }

  update(id: number, updatePortfolioItemDto: UpdatePortfolioItemDto) {
    return `This action updates a #${id} portfolioItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} portfolioItem`;
  }

  async uploadPhoto(id: number, photo: Express.Multer.File) {
    try {
      if (!photo) {
        throw new BadRequestException('File is not an image.');
      }

      const portfolioItem = await this.findOne(id);

      const photoUrl = `${this.configService.get('BASE_URL')}portfolio/photos/${photo.filename}`;

      const newPortfolioItemPhoto = this.portfolioItemPhotosRepository.create({
        photoUrl,
        portfolio: { id: portfolioItem.id },
      });

      await this.portfolioItemPhotosRepository.save(newPortfolioItemPhoto);

      return newPortfolioItemPhoto;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }
}
