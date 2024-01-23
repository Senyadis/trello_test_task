import { BasicResponse } from 'src/common/responses/basic.response';
import { ColumnModel } from '../column.model';
import { ApiProperty } from '@nestjs/swagger';

export class ColumnResponse extends BasicResponse {
  @ApiProperty()
  column: ColumnModel;
}
