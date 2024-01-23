import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class BasicResponse {
  @ApiProperty()
  statusCode: HttpStatus;
}
