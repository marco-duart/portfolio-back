import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Query } from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createResumeDto: CreateResumeDto) {
    return this.resumesService.create(createResumeDto);
  }

  @Get()
  findOne(@Query('userId', ParseIntPipe) userId: number) {
    return this.resumesService.findOne(userId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateResumeDto: UpdateResumeDto) {
    return this.resumesService.update(id, updateResumeDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.resumesService.remove(id);
  }
}
