import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from 'src/database/entities/skill.entity';
import { ResumesService } from 'src/resumes/resumes.service';
import { SUCCESSFUL_MESSAGE } from 'src/enums/successful-message.enum';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
    private resumesService: ResumesService
  ) {}

  async create(createSkillDto: CreateSkillDto) {
    try {
      const { resumeId, ...data } = createSkillDto;
      const resume = await this.resumesService.findOne(resumeId);

      const newSkill = this.skillRepository.create(data);
      newSkill.resume = resume;

      await this.skillRepository.save(newSkill);

      return newSkill;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    try {
      return await this.skillRepository.find();
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
    try {
      const skill = await this.skillRepository.findOne({
        where: { id },
      }); // VERIFICAR: SUBSTITUIR POR EXISTS?

      if (!skill) {
        throw new NotFoundException(
          `A skill with this id: ${id} not found.`,
        );
      }

      return skill;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, updateSkillDto: UpdateSkillDto) {
    try {
      await this.findOne(id);

      await this.skillRepository.update(id, updateSkillDto);

      return await this.findOne(id);
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id);

      await this.skillRepository.delete(id);

      return { message: SUCCESSFUL_MESSAGE.DELETE_SKILL };
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }
}
