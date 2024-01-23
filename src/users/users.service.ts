import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserModel } from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(dto: CreateUserDto): Promise<UserModel> {
    const checkUser = await this.usersRepository.findByEmail(dto.email);

    if (checkUser) {
      throw new BadRequestException('Users Exists!');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.usersRepository.create({
      ...dto,
      password: passwordHash,
    });
    return new UserModel(user);
  }

  async findById(id: number): Promise<UserModel | null> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      return null;
    }

    return new UserModel(user);
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      return null;
    }

    return new UserModel(user);
  }
}
