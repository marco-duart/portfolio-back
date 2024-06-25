import { ApiProperty } from '@nestjs/swagger';

export class CurrentUserDto {
  user: number;

  email: string;
}
