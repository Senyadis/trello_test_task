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
import { ColumnsService } from './columns.service';
import { CreateOrUpdateColumnDto } from './dto/create-or-update-column.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ColumnListResponse } from './responses/column-list.response';
import { ColumnResponse } from './responses/column.response';
import { BasicResponse } from 'src/common/responses/basic.response';

@Controller('columns')
@UseGuards(JwtAuth)
@UsePipes(ValidationPipe)
@ApiTags('Columns')
@ApiBearerAuth()
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Get('')
  @ApiOkResponse({ description: 'Colum List', type: ColumnListResponse })
  async getAll() {
    const columns = await this.columnsService.findAll();

    return {
      statusCode: HttpStatus.OK,
      columns,
    };
  }

  @Get(':id/')
  @ApiOkResponse({ description: 'Column', type: ColumnResponse })
  @ApiNotFoundResponse()
  async getColumnById(@Param('id', ParseIntPipe) id: number) {
    const column = await this.columnsService.findById(id);

    return {
      statusCode: HttpStatus.OK,
      column,
    };
  }

  @Post()
  @ApiCreatedResponse({ description: 'Created Column', type: ColumnResponse })
  async create(
    @Body() body: CreateOrUpdateColumnDto,
    @Req() request,
  ): Promise<ColumnResponse> {
    const column = await this.columnsService.create({
      title: body.title,
      userId: request.user.id,
    });

    return {
      statusCode: HttpStatus.CREATED,
      column,
    };
  }

  @Put(':id/')
  @ApiOkResponse({ description: 'Updated column', type: ColumnResponse })
  @ApiNotFoundResponse()
  async updateColumnById(
    @Body() body: CreateOrUpdateColumnDto,
    @Param('id', ParseIntPipe) id: number,
    @Req() request,
  ): Promise<ColumnResponse> {
    const column = await this.columnsService.update(id, {
      title: body.title,
      userId: request.user.id,
    });

    return {
      statusCode: HttpStatus.OK,
      column,
    };
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Success delete', type: BasicResponse })
  @ApiNotFoundResponse()
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() request,
  ): Promise<BasicResponse> {
    await this.columnsService.delete(id, request.user.id);

    return {
      statusCode: HttpStatus.OK,
    };
  }
}
