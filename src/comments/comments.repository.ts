import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prsima.service';
import { CreateOrUpdateCommentDto } from './dto/create-or-update-comment.dto';
import { Comment } from '@prisma/client';

@Injectable()
export class CommentsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateOrUpdateCommentDto): Promise<Comment> {
    return this.prismaService.comment.create({
      data: dto,
    });
  }

  async update(id: number, dto: CreateOrUpdateCommentDto): Promise<Comment> {
    return this.prismaService.comment.update({
      where: { id },
      data: dto,
    });
  }

  async findActiveByCardId(cardId: number): Promise<Comment[]> {
    return this.prismaService.comment.findMany({
      where: { cardId, isActive: true },
    });
  }

  async findActiveById(id: number): Promise<Comment | null> {
    return this.prismaService.comment.findUnique({
      where: { id, isActive: true },
    });
  }

  async remove(id: number): Promise<void> {
    await this.prismaService.comment.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
