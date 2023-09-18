import { Controller, Param, Get, Res, UseGuards } from '@nestjs/common';
import { SessionService } from './session.service';
import { IdsDto } from './dto/ids.dto';
import { SessionInitDto } from './dto/session-init.dto';
import { GoogleAuthGuard } from 'src/auth/guards/google-auth.guard';

@Controller('users/:userId')
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @Get('/:deviceId/session/initialise')
  async initialise(@Param() sessionInitDto: SessionInitDto) {
    return await this.sessionService.handleInitialisation(sessionInitDto);
  }

  @Get('/:deviceId/session/:sessionId/ping')
  async ping(@Param() ids: IdsDto) {
    return this.sessionService.handlePing(ids);
  }

  @Get('sessions')
  @UseGuards(GoogleAuthGuard)
  async userSessions(@Param('userId') userId: number) {
    return await this.sessionService.getUserSessions(userId);
  }
}
