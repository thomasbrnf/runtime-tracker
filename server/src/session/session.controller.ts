import { Controller, Param, Get, Res } from '@nestjs/common';
import { SessionService } from './session.service';
import { IdsDto } from './dto/ids.dto';
import { SessionInitDto } from './dto/session-init.dto';

@Controller('users/:userId/:deviceId/session')
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @Get('initialise')
  async initialise(@Param() sessionInitDto: SessionInitDto) {
    return await this.sessionService.handleInitialisation(sessionInitDto);
  }

  @Get(':sessionId/ping')
  async ping(@Param() ids: IdsDto) {
   return this.sessionService.handlePing(ids);
  }
}
