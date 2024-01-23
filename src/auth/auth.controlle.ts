import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpStatus,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthUserDto } from './dto/auth-user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserResponse } from './responses/user.response';
import { TokenResponse } from './responses/token.response';

@Controller('auth')
@UsePipes(ValidationPipe)
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('create')
  @ApiCreatedResponse({ description: 'Created User', type: UserResponse })
  @ApiBadRequestResponse()
  async create(@Body() body: CreateUserDto): Promise<UserResponse> {
    const user = await this.usersService.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: body.password,
    });

    return {
      statusCode: HttpStatus.CREATED,
      user,
    };
  }

  @Post('auth')
  @ApiOkResponse({ description: 'Auth token', type: TokenResponse })
  @ApiUnauthorizedResponse()
  async auth(@Body() body: AuthUserDto): Promise<TokenResponse> {
    const token = await this.authService.authUser({
      email: body.email,
      password: body.password,
    });

    return {
      statusCode: HttpStatus.OK,
      token,
    };
  }
}
