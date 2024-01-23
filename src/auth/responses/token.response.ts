import { ApiProperty } from '@nestjs/swagger';
import { BasicResponse } from 'src/common/responses/basic.response';

export class TokenResponse extends BasicResponse {
  @ApiProperty()
  token: string;
}
