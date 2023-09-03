import { Module } from '@nestjs/common';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { DeviceModule } from 'src/device/device.module';
import { UsersModule } from 'src/users/users.module';
import { CalendarModule } from 'src/calendar/calendar.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Session]),
    DeviceModule,
    UsersModule,
    CalendarModule,
  ],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
