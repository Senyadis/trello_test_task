import { ApiProperty } from '@nestjs/swagger';

export class CommentModel {
  @ApiProperty()
  id: number;
  @ApiProperty()
  text: string;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  cardId: number;
  @ApiProperty()
  isActive: boolean;

  constructor(data: Partial<CommentModel>) {
    Object.assign(this, data);
  }
}
