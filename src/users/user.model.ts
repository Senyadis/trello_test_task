import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UserModel {
  @ApiProperty()
  id: number;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  isActive: boolean;

  @Exclude()
  password: string;

  constructor(data: Partial<UserModel>) {
    Object.assign(this, data);
  }
}
