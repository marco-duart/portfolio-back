import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePortfolioItemDto } from './dto/create-portfolio-item.dto';
import { UpdatePortfolioItemDto } from './dto/update-portfolio-item.dto';
import { ConfigService } from '@nestjs/config';
import { PortfolioItem } from 'src/database/entities/portfolio-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PortfolioItemPhoto } from 'src/database/entities/portfolio-item-photo.entity';
import { UsersService } from 'src/users/users.service';
import { SUCCESSFUL_MESSAGE } from 'src/enums/successful-message.enum';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PortfolioItemsService {
  constructor(
    @InjectRepository(PortfolioItem)
    private portfolioItemsRepository: Repository<PortfolioItem>,
    @InjectRepository(PortfolioItemPhoto)
    private portfolioItemPhotosRepository: Repository<PortfolioItemPhoto>,
    private usersService: UsersService,
    private configService: ConfigService,
  ) {}

  async create(createPortfolioItemDto: CreatePortfolioItemDto) {
    try {
      const { userId, ...data } = createPortfolioItemDto;
      const user = await this.usersService.findOne(userId);

      const newPortfolioItem = this.portfolioItemsRepository.create(data);
      newPortfolioItem.user = user;

      await this.portfolioItemsRepository.save(newPortfolioItem);

      return newPortfolioItem;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    try {
      return await this.portfolioItemsRepository.find();
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
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
        throw new NotFoundException(
          `A portfolio item with this id: ${id} not found.`,
        );
      }

      return portfolioItem;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, updatePortfolioItemDto: UpdatePortfolioItemDto) {
    try {
      await this.findOne(id);

      await this.portfolioItemsRepository.update(id, updatePortfolioItemDto);

      return await this.findOne(id);
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id);

      await this.portfolioItemsRepository.delete(id);

      return { message: SUCCESSFUL_MESSAGE.DELETE_PORTFOLIO_ITEM };
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async uploadPhoto(id: number, photo: Express.Multer.File) {
    try {
      if (!photo) {
        throw new BadRequestException('File is not an image.');
      }

      const portfolioItem = await this.findOne(id);

      const photoUrl = `${this.configService.get('BASE_URL')}/uploads/${photo.filename}`;

      const newPortfolioItemPhoto = this.portfolioItemPhotosRepository.create({
        photoUrl,
      });

      newPortfolioItemPhoto.portfolio = portfolioItem;

      await this.portfolioItemPhotosRepository.save(newPortfolioItemPhoto);

      return newPortfolioItemPhoto;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async deletePhoto(photoId: number) {
    const portfolioItemPhoto = await this.portfolioItemPhotosRepository.findOne(
      {
        where: { id: photoId },
      },
    );

    if (!portfolioItemPhoto) {
      throw new NotFoundException('Photo not found.');
    }

    const photoUrl = portfolioItemPhoto.photoUrl;
    const filename = photoUrl.split('/').pop();

    if (!filename) {
      throw new Error('Invalid photo URL.');
    }

    const filePath = path.join('./public/uploads', filename);

    try {
      fs.unlinkSync(filePath);
    } catch (error) {
      console.error(`Error deleting file: ${error.message}`);
      throw new Error('Failed to delete file.');
    }

    await this.portfolioItemPhotosRepository.delete(portfolioItemPhoto.id);

    return { message: SUCCESSFUL_MESSAGE.DELETE_PORTFOLIO_ITEM_PHOTO };
  }
}
