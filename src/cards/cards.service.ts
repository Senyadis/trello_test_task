import { Injectable, NotFoundException } from '@nestjs/common';
import { CardsRepository } from './cards.repository';
import { CreateCardDto } from './dto/create-card.dto';
import { CardModel } from './card.model';
import { ColumnsService } from 'src/columns/columns.service';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  constructor(
    private readonly cardsRepository: CardsRepository,
    private readonly columnService: ColumnsService,
  ) {}

  async create(dto: CreateCardDto): Promise<CardModel> {
    await this.columnService.findById(dto.columnId);

    const card = await this.cardsRepository.create(dto);

    return new CardModel(card);
  }

  async update(id: number, dto: UpdateCardDto): Promise<CardModel> {
    const checkCard = await this.cardsRepository.findActiveById(id);

    if (
      !checkCard ||
      checkCard.userId !== dto.userId ||
      checkCard.columnId !== dto.columnId
    ) {
      throw new NotFoundException('Card not found');
    }

    const card = await this.cardsRepository.update(id, dto);

    return new CardModel(card);
  }

  async findById(id: number): Promise<CardModel> {
    const card = await this.cardsRepository.findActiveById(id);

    if (!card) {
      throw new NotFoundException('Card Not Found!');
    }

    return new CardModel(card);
  }

  async findByColumnId(columnId): Promise<CardModel[]> {
    const cards = await this.cardsRepository.findByActiveByColumnId(columnId);

    return cards.map((card) => new CardModel(card));
  }

  async findByIdAndColumnId(id: number, columnId: number): Promise<CardModel> {
    const card = await this.cardsRepository.findActiveById(id);

    if (!card || card.columnId !== columnId) {
      throw new NotFoundException('Card Not Found!');
    }

    return new CardModel(card);
  }

  async delete(id: number, columnId: number, userId: number): Promise<void> {
    const checkCard = await this.cardsRepository.findActiveById(id);

    if (
      !checkCard ||
      checkCard.userId !== userId ||
      checkCard.columnId !== columnId
    ) {
      throw new NotFoundException('Card Not Found!');
    }

    await this.cardsRepository.remove(id);
  }
}
