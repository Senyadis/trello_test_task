import { ApiProperty } from '@nestjs/swagger';

export class CardModel {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  isActive: boolean;
  @ApiProperty()
  columnId: number;
  @ApiProperty()
  userId: number;

  constructor(data: Partial<CardModel>) {
    Object.assign(this, data);
  }
}
