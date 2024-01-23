import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrUpdateColumnDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;

  userId: number;
}
