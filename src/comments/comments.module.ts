import { Module } from '@nestjs/common';
import { CardsModule } from 'src/cards/cards.module';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentsRepository } from './comments.repository';

@Module({
  imports: [CardsModule, PrismaModule],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository],
})
export class CommentsModule {}
