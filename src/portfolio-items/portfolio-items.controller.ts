import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, ParseIntPipe, UseGuards, UseInterceptors } from '@nestjs/common';
import { PortfolioItemsService } from './portfolio-items.service';
import { CreatePortfolioItemDto } from './dto/create-portfolio-item.dto';
import { UpdatePortfolioItemDto } from './dto/update-portfolio-item.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { diskStorage } from 'multer';

@Controller('portfolio-items')
export class PortfolioItemsController {
  constructor(private readonly portfolioItemsService: PortfolioItemsService) {}

  @Post()
  create(@Body() createPortfolioItemDto: CreatePortfolioItemDto) {
    return this.portfolioItemsService.create(createPortfolioItemDto);
  }

  @Get()
  findAll() {
    return this.portfolioItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.portfolioItemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePortfolioItemDto: UpdatePortfolioItemDto) {
    return this.portfolioItemsService.update(+id, updatePortfolioItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.portfolioItemsService.remove(+id);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads',
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
}
