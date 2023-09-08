import { Module } from '@nestjs/common';
import { ScriptService } from './script.service';
import { ScriptController } from './script.controller';
import { DeviceModule } from 'src/device/device.module';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [DeviceModule, UsersModule, HttpModule],
  providers: [ScriptService],
  controllers: [ScriptController],
})
export class ScriptModule {}
