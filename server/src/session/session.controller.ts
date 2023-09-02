import { Controller, Post, Body, Param } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionDto } from './dto/session.dto';

@Controller('users/:userId/:deviceId/session')
export class SessionController {
  constructor(private sessionService: SessionService) {}

  // @Post('initialise')
  // async initialise(   @Param() userId,
  //                     @Param() deviceId,
  //                     @Body() sessionDto: SessionDto ) {

  //     this.sessionService.initialise(userId, deviceId, sessionDto);

  // }

  // @Post('ping')
  // async ping( @Param() userId,
  //             @Param() deviceId,
  //             @Body() sessionDto: SessionDto ) {

  //     this.sessionService.ping(userId, deviceId, sessionDto);

  // }
}
