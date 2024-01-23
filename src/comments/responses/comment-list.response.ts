import { BasicResponse } from 'src/common/responses/basic.response';
import { CommentModel } from '../comment.model';
import { ApiProperty } from '@nestjs/swagger';

export class CommentListResponse extends BasicResponse {
  @ApiProperty({ type: [CommentModel] })
  comments: CommentModel[];
}
