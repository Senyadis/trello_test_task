import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const JwtConfig = {
  secret: process.env.SECRET || 'secrer',
  global: true,
} as JwtModuleAsyncOptions;
