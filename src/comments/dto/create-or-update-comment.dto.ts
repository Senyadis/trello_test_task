import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrUpdateCommentDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  text: string;

  userId: number;

  cardId: number;
}
