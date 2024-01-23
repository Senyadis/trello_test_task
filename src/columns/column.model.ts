import { ApiProperty } from '@nestjs/swagger';

export class ColumnModel {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  userId: number;

  constructor(data: Partial<ColumnModel>) {
    Object.assign(this, data);
  }
}
