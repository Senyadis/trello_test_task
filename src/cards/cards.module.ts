import { Module } from '@nestjs/common';
import { ColumnsModule } from 'src/columns/columns.module';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { CardsRepository } from './cards.repository';
import { PrismaModule } from 'src/common/prisma/prisma.module';

@Module({
  imports: [ColumnsModule, PrismaModule],
  controllers: [CardsController],
  providers: [CardsService, CardsRepository],
  exports: [CardsService],
})
export class CardsModule {}
