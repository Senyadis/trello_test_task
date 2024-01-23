import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ColumnsRepository } from './columns.repository';
import { CreateOrUpdateColumnDto } from './dto/create-or-update-column.dto';
import { ColumnModel } from './column.model';

@Injectable()
export class ColumnsService {
  constructor(private readonly columnsRepository: ColumnsRepository) {}

  async create(dto: CreateOrUpdateColumnDto): Promise<ColumnModel> {
    const column = await this.columnsRepository.create(dto);

    return new ColumnModel(column);
  }

  async update(id: number, dto: CreateOrUpdateColumnDto): Promise<ColumnModel> {
    const checkColumn = await this.columnsRepository.findActiveById(id);

    if (!checkColumn || checkColumn.userId !== dto.userId) {
      throw new BadRequestException('Column Not Found!');
    }

    const column = await this.columnsRepository.update(id, dto);
    return new ColumnModel(column);
  }

  async findAll() {
    const columns = await this.columnsRepository.findAll();

    return columns.map((col) => new ColumnModel(col));
  }

  async findById(id: number): Promise<ColumnModel> {
    const column = await this.columnsRepository.findActiveById(id);

    if (!column) {
      throw new NotFoundException('Column Not Found!');
    }

    return new ColumnModel(column);
  }

  async delete(id: number, userId: number): Promise<void> {
    const column = await this.columnsRepository.findActiveById(id);

    if (!column || column.userId !== userId) {
      throw new NotFoundException('Column Not Found!');
    }

    await this.columnsRepository.remove(id);
  }
}
