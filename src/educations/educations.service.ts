import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { Education } from 'src/database/entities/education.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResumesService } from 'src/resumes/resumes.service';
import { SUCCESSFUL_MESSAGE } from 'src/enums/successful-message.enum';

@Injectable()
export class EducationsService {
  constructor(
    @InjectRepository(Education)
    private educationRepository: Repository<Education>,
    private resumesService: ResumesService,
  ) {}

  async create(createEducationDto: CreateEducationDto) {
    try {
      const { resumeId, ...data } = createEducationDto;
      const resume = await this.resumesService.findOne(resumeId);

      const newEducation = this.educationRepository.create(data);
      newEducation.resume = resume;

      await this.educationRepository.save(newEducation);

      return newEducation;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    try {
      return await this.educationRepository.find();
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
    try {
      const education = await this.educationRepository.findOne({
        where: { id },
      }); // VERIFICAR: SUBSTITUIR POR EXISTS?

      if (!education) {
        throw new NotFoundException(
          `A education with this id: ${id} not found.`,
        );
      }

      return education;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, updateEducationDto: UpdateEducationDto) {
    try {
      await this.findOne(id);

      await this.educationRepository.update(id, updateEducationDto);

      return await this.findOne(id);
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id);

      await this.educationRepository.delete(id);

      return { message: SUCCESSFUL_MESSAGE.DELETE_EDUCATION };
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }
}
