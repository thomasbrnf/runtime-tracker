import { Controller, Post, Param, StreamableFile, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from 'src/auth/guards/google-auth.guard';
import { ScriptService } from './script.service';
import { DataDto } from './dto/data.dto';

@Controller('/users/:userId/devices/:deviceId/script')
export class ScriptController {
  constructor(private scriptService: ScriptService) {}

  @Post('download')
  @UseGuards(GoogleAuthGuard)
  async fetchFile(@Param() data: DataDto) {
    return new StreamableFile(await this.scriptService.fetchExecutable(data));
  }
}
