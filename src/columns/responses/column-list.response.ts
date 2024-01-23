import { BasicResponse } from 'src/common/responses/basic.response';
import { ColumnModel } from '../column.model';
import { ApiProperty } from '@nestjs/swagger';

export class ColumnListResponse extends BasicResponse {
  @ApiProperty({ type: [ColumnModel] })
  columns: ColumnModel[];
}
