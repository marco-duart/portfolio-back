import { ApiProperty } from '@nestjs/swagger';

export class CurrentUserDto {
  id: number;

  email: string;
}
