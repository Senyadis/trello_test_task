import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthUserDto } from './dto/auth-user.dto';
import { UserModel } from 'src/users/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async authUser(authDto: AuthUserDto): Promise<string> {
    const user = await this.usersService.findByEmail(authDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(authDto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.generateToken(user.id);
  }

  async validateToken(token: string): Promise<UserModel> {
    const id = await this.getUserIdByToken(token);
    const user = await this.usersService.findById(id);

    if (!user) {
      throw new UnauthorizedException('Auth error!');
    }

    return user;
  }

  private async generateToken(userId: number): Promise<string> {
    const payload = { sub: userId };
    return this.jwtService.signAsync(payload);
  }

  private async getUserIdByToken(token: string): Promise<number> {
    try {
      const { sub } = await this.jwtService.verifyAsync<{ sub: number }>(token);
      return sub;
    } catch {
      throw new UnauthorizedException('Auth error!');
    }
  }
}
