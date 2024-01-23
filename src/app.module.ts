import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ColumnsModule } from './columns/columns.module';
import { JwtModule } from '@nestjs/jwt';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';
import { JwtConfig } from './common/config/jwt.config';

@Module({
  imports: [
    AuthModule,
    ColumnsModule,
    CardsModule,
    CommentsModule,
    JwtModule.register(JwtConfig),
  ],
})
export class AppModule {}
