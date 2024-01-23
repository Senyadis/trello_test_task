import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class JwtAuth implements CanActivate {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenByRequest(request);
    const user = await this.authService.validateToken(token);
    request['user'] = user;

    return true;
  }

  private extractTokenByRequest(req: Request): string {
    const [type, token] = req.headers.authorization?.split(' ') || [];
    return type === 'Bearer' ? token : '';
  }
}
