import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCardDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  title?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  description?: string;

  columnId: number;

  userId: number;
}
