import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { Resume } from 'src/database/entities/resume.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { SUCCESSFUL_MESSAGE } from 'src/enums/successful-message.enum';

@Injectable()
export class ResumesService {
  constructor(
    @InjectRepository(Resume)
    private resumeRepository: Repository<Resume>,
    private usersService: UsersService
  ) {}

  async create(createResumeDto: CreateResumeDto) {
    try {
      const { userId, ...data } = createResumeDto;
      const user = await this.usersService.findOne(userId);

      const newResume = this.resumeRepository.create(data);
      newResume.user = user;

      await this.resumeRepository.save(newResume);

      return newResume;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
    try {
      const resume = await this.resumeRepository.findOne({ where: { user: { id } } });

      if (!resume) {
        throw new NotFoundException(`A resume with this id: ${id} not found.`);
      }

      return resume
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, updateResumeDto: UpdateResumeDto) {
    try {
      await this.findOne(id);

      await this.resumeRepository.update(id, updateResumeDto);

      return await this.findOne(id);
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id);

      await this.resumeRepository.delete(id);

      return { message: SUCCESSFUL_MESSAGE.DELETE_RESUME };
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }
}
