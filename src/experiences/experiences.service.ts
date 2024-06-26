import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Experience } from 'src/database/entities/experience.entity';
import { ResumesService } from 'src/resumes/resumes.service';
import { SUCCESSFUL_MESSAGE } from 'src/enums/successful-message.enum';

@Injectable()
export class ExperiencesService {
  constructor(
    @InjectRepository(Experience)
    private experienceRepository: Repository<Experience>,
    private resumesService: ResumesService,
  ) {}

  async create(createExperienceDto: CreateExperienceDto) {
    try {
      const { resumeId, ...data } = createExperienceDto;
      const resume = await this.resumesService.findOne(resumeId);

      const newExperience = this.experienceRepository.create(data);
      newExperience.resume = resume;

      await this.experienceRepository.save(newExperience);

      return newExperience;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    try {
      return await this.experienceRepository.find();
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
    try {
      const experience = await this.experienceRepository.findOne({
        where: { id },
      }); // VERIFICAR: SUBSTITUIR POR EXISTS?

      if (!experience) {
        throw new NotFoundException(
          `An experience with this id: ${id} not found.`,
        );
      }

      return experience;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, updateExperienceDto: UpdateExperienceDto) {
    try {
      await this.findOne(id);

      await this.experienceRepository.update(id, updateExperienceDto);

      return await this.findOne(id);
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id);

      await this.experienceRepository.delete(id);

      return { message: SUCCESSFUL_MESSAGE.DELETE_EXPERIENCE };
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }
}
