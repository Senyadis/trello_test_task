import { BasicResponse } from 'src/common/responses/basic.response';
import { CardModel } from '../card.model';
import { ApiProperty } from '@nestjs/swagger';

export class CardListResponse extends BasicResponse {
  @ApiProperty({ type: [CardModel] })
  cards: CardModel[];
}
