import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuth } from 'src/common/guards/jwt-auth.guard';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CardListResponse } from './responses/card-list.response';
import { CardResponse } from './responses/card.response';
import { BasicResponse } from 'src/common/responses/basic.response';

@Controller('columns/:columnId/cards')
@UsePipes(ValidationPipe)
@UseGuards(JwtAuth)
@ApiTags('Cards')
@ApiBearerAuth()
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get()
  @ApiOkResponse({
    description: 'Cards list by column id',
    type: CardListResponse,
  })
  @ApiBadRequestResponse({
    description: 'Invalid columnId',
  })
  async getByColumnId(
    @Param('columnId', ParseIntPipe) columnId: number,
  ): Promise<CardListResponse> {
    const cards = await this.cardsService.findByColumnId(columnId);

    return {
      statusCode: HttpStatus.OK,
      cards,
    };
  }

  @Get(':cardId')
  @ApiOkResponse({
    description: 'Card',
    type: CardResponse,
  })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async getById(
    @Param('cardId', ParseIntPipe) id: number,
    @Param('columnId', ParseIntPipe) columnId: number,
  ): Promise<CardResponse> {
    const card = await this.cardsService.findByIdAndColumnId(id, columnId);

    return {
      statusCode: HttpStatus.OK,
      card,
    };
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Created card',
    type: CardResponse,
  })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async create(
    @Param('columnId', ParseIntPipe) columnId: number,
    @Body() body: CreateCardDto,
    @Req() request,
  ): Promise<CardResponse> {
    const card = await this.cardsService.create({
      title: body.title,
      description: body.description,
      columnId: columnId,
      userId: request.user.id,
    });

    return {
      statusCode: HttpStatus.CREATED,
      card,
    };
  }

  @Put(':cardId')
  @ApiOkResponse({
    description: 'Updated Card',
    type: CardResponse,
  })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async update(
    @Param('columnId', ParseIntPipe) columnId: number,
    @Param('cardId', ParseIntPipe) cardId: number,
    @Body() dto: UpdateCardDto,
    @Req() request,
  ): Promise<CardResponse> {
    const card = await this.cardsService.update(cardId, {
      title: dto.title || undefined,
      description: dto.description || undefined,
      columnId: columnId,
      userId: request.user.id,
    });

    return {
      statusCode: HttpStatus.OK,
      card,
    };
  }

  @Delete(':cardId')
  @ApiOkResponse({
    description: 'Success delete',
    type: BasicResponse,
  })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async delete(
    @Param('cardId', ParseIntPipe) id: number,
    @Param('columnId', ParseIntPipe) columnId: number,
    @Req() request,
  ): Promise<BasicResponse> {
    await this.cardsService.delete(id, columnId, request.user.id);

    return {
      statusCode: HttpStatus.OK,
    };
  }
}
