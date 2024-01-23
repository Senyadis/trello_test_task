import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prsima.service';
import { CreateCardDto } from './dto/create-card.dto';
import { Card } from '@prisma/client';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateCardDto): Promise<Card> {
    return this.prismaService.card.create({
      data: dto,
    });
  }

  async update(id: number, dto: UpdateCardDto): Promise<Card> {
    return this.prismaService.card.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number): Promise<Card> {
    return this.prismaService.card.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async findByActiveByColumnId(columnId: number): Promise<Card[]> {
    return this.prismaService.card.findMany({
      where: { columnId, isActive: true },
    });
  }

  async findActiveById(id: number): Promise<Card | null> {
    return this.prismaService.card.findUnique({
      where: { id, isActive: true },
    });
  }
}
