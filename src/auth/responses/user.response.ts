import { ApiProperty } from '@nestjs/swagger';
import { BasicResponse } from 'src/common/responses/basic.response';
import { UserModel } from 'src/users/user.model';

export class UserResponse extends BasicResponse {
  @ApiProperty()
  user: UserModel;
}
