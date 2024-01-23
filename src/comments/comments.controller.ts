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
import { CommentsService } from './comments.service';
import { JwtAuth } from 'src/common/guards/jwt-auth.guard';
import { CreateOrUpdateCommentDto } from './dto/create-or-update-comment.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CommentListResponse } from './responses/comment-list.response';
import { CommentResponse } from './responses/comment.response';
import { BasicResponse } from 'src/common/responses/basic.response';

@Controller('cards/:cardId/comments')
@UsePipes(ValidationPipe)
@UseGuards(JwtAuth)
@ApiTags('Comments')
@ApiBearerAuth()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  @ApiOkResponse({
    description: 'Comment List by CardId',
    type: CommentListResponse,
  })
  async findByCardId(
    @Param('cardId', ParseIntPipe) cardId: number,
  ): Promise<CommentListResponse> {
    const comments = await this.commentsService.findByCardId(cardId);

    return {
      statusCode: HttpStatus.OK,
      comments,
    };
  }

  @Get(':commentId')
  @ApiOkResponse({ description: 'Comment by card id ', type: CommentResponse })
  async findByIdAndCardId(
    @Param('cardId', ParseIntPipe) cardId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
  ): Promise<CommentResponse> {
    const comment = await this.commentsService.findByIdAndCardId(
      commentId,
      cardId,
    );

    return {
      statusCode: HttpStatus.OK,
      comment,
    };
  }

  @Post()
  @ApiCreatedResponse({ description: 'Created comment', type: CommentResponse })
  @ApiBadRequestResponse()
  async create(
    @Param('cardId', ParseIntPipe) cardId: number,
    @Body() body: CreateOrUpdateCommentDto,
    @Req() request,
  ): Promise<CommentResponse> {
    const comment = await this.commentsService.create({
      text: body.text,
      userId: request.user.id,
      cardId,
    });

    return {
      statusCode: HttpStatus.CREATED,
      comment,
    };
  }

  @Put(':commentId')
  @ApiOkResponse({ description: 'Updated comment', type: CommentResponse })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async update(
    @Param('cardId', ParseIntPipe) cardId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() body: CreateOrUpdateCommentDto,
    @Req() request,
  ): Promise<CommentResponse> {
    const comment = await this.commentsService.update(commentId, {
      text: body.text,
      userId: request.user.id,
      cardId,
    });

    return {
      statusCode: HttpStatus.OK,
      comment,
    };
  }

  @Delete(':commentId')
  @ApiOkResponse({ description: 'Success delete', type: BasicResponse })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async delete(
    @Param('cardId', ParseIntPipe) cardId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Req() request,
  ): Promise<BasicResponse> {
    await this.commentsService.delete(commentId, request.user.id, cardId);

    return {
      statusCode: HttpStatus.OK,
    };
  }
}
