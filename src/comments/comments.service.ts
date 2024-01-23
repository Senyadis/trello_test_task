import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { CreateOrUpdateCommentDto } from './dto/create-or-update-comment.dto';
import { CommentModel } from './comment.model';
import { CardsService } from 'src/cards/cards.service';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly cardService: CardsService,
  ) {}

  async create(dto: CreateOrUpdateCommentDto): Promise<CommentModel> {
    await this.cardService.findById(dto.cardId);

    const comment = await this.commentsRepository.create(dto);

    return new CommentModel(comment);
  }

  async update(
    id: number,
    dto: CreateOrUpdateCommentDto,
  ): Promise<CommentModel> {
    const checkComment = await this.commentsRepository.findActiveById(id);

    if (
      !checkComment ||
      checkComment.userId !== dto.userId ||
      checkComment.cardId !== dto.cardId
    ) {
      throw new NotFoundException('Comment Not Found!');
    }

    const comment = await this.commentsRepository.update(id, dto);
    return new CommentModel(comment);
  }

  async delete(id: number, userId: number, cardId: number): Promise<void> {
    const comment = await this.commentsRepository.findActiveById(id);

    if (!comment || comment.userId !== userId || comment.cardId !== cardId) {
      throw new NotFoundException('Comment Not Found!');
    }

    await this.commentsRepository.remove(id);
  }

  async findByIdAndCardId(id: number, cardId: number): Promise<CommentModel> {
    const comment = await this.commentsRepository.findActiveById(id);

    if (!comment || comment.cardId !== cardId) {
      throw new NotFoundException('Comment Not Found!');
    }

    return new CommentModel(comment);
  }

  async findByCardId(cardId: number): Promise<CommentModel[]> {
    await this.cardService.findById(cardId);

    const comments = await this.commentsRepository.findActiveByCardId(cardId);
    return comments.map((comment) => new CommentModel(comment));
  }
}
