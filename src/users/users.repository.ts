import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prsima.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateUserDto): Promise<User> {
    return this.prismaService.user.create({
      data: dto,
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { email: email } });
  }
}
