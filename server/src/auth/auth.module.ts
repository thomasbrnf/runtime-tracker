import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStategy } from 'src/auth/strategies/google.stategy';
import { UsersModule } from 'src/users/users.module';
import { HttpModule } from '@nestjs/axios';
import { GoogleAuthGuard } from './guards/google-auth.guard';

@Module({
  imports: [HttpModule, UsersModule],
  controllers: [AuthController],
  providers: [GoogleStategy, AuthService, GoogleAuthGuard],
})
export class AuthModule {}
