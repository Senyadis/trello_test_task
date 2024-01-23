import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prsima.service';
import { CreateOrUpdateColumnDto } from './dto/create-or-update-column.dto';
import { Column } from '@prisma/client';

@Injectable()
export class ColumnsRepository {
  constructor(private readonly prismaServise: PrismaService) {}

  async create(dto: CreateOrUpdateColumnDto): Promise<Column> {
    return this.prismaServise.column.create({
      data: dto,
    });
  }

  async update(id: number, dto: CreateOrUpdateColumnDto): Promise<Column> {
    return this.prismaServise.column.update({
      where: { id },
      data: dto,
    });
  }

  async findAll(): Promise<Column[]> {
    return this.prismaServise.column.findMany();
  }

  async findActiveById(id: number): Promise<Column | null> {
    return this.prismaServise.column.findUnique({
      where: { id, isActive: true },
    });
  }

  async remove(id: number): Promise<Column | null> {
    return this.prismaServise.column.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
