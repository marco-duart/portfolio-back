import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { SUCCESSFUL_MESSAGE } from 'src/enums/successful-message.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async findAll() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      }); // VERIFICAR: SUBSTITUIR POR EXISTS?

      if (!user) {
        throw new NotFoundException(
          `An user with this id: ${id} not found.`,
        );
      }

      return user;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      await this.findOne(id);

      await this.userRepository.update(id, updateUserDto);

      return await this.findOne(id);
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id);

      await this.userRepository.delete(id);

      return { message: SUCCESSFUL_MESSAGE.DELETE_EDUCATION };
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }
  }
}
