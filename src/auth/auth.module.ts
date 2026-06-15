import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

import { UsersModule } from '../users/users.module';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    JwtModule.register({
      secret: 'warehouse-secret-key',
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}