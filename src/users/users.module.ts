import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';

@Module({
  imports: [PrismaModule],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
