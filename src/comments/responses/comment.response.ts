import { BasicResponse } from 'src/common/responses/basic.response';
import { CommentModel } from '../comment.model';
import { ApiProperty } from '@nestjs/swagger';

export class CommentResponse extends BasicResponse {
  @ApiProperty()
  comment: CommentModel;
}
