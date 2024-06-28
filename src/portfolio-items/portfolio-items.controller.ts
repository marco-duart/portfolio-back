import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PortfolioItemsService } from './portfolio-items.service';
import { CreatePortfolioItemDto } from './dto/create-portfolio-item.dto';
import { UpdatePortfolioItemDto } from './dto/update-portfolio-item.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { diskStorage } from 'multer';

@Controller('portfolio')
export class PortfolioItemsController {
  constructor(private readonly portfolioItemsService: PortfolioItemsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPortfolioItemDto: CreatePortfolioItemDto) {
    return this.portfolioItemsService.create(createPortfolioItemDto);
  }

  @Get()
  findAll() {
    return this.portfolioItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.portfolioItemsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePortfolioItemDto: UpdatePortfolioItemDto,
  ) {
    return this.portfolioItemsService.update(id, updatePortfolioItemDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.portfolioItemsService.remove(id);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => {
          const name = file.originalname.split('.')[0];
          const extension = file.originalname.split('.')[1];

          const newFileName =
            name.split(' ').join('_') + '_' + Date.now() + '.' + extension;

          cb(null, newFileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpeg|jpg|png|gif)$/)) {
          return cb(null, false);
        }

        cb(null, true);
      },
    }),
  )
  @Post(':id/upload-photo')
  async uploadPhoto(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    return await this.portfolioItemsService.uploadPhoto(id, photo);
  }

  @UseGuards(AuthGuard)
  @Delete('delete-photo/:photoId')
  async deletePhoto(@Param('photoId', ParseIntPipe) photoId: number) {
    return await this.portfolioItemsService.deletePhoto(photoId);
  }
}
