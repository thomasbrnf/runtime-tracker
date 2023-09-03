import { CreateEventDto } from 'src/calendar/dto/create-event.dto';
import { CalendarService } from 'src/calendar/calendar.service';
import { Device } from 'src/device/entities/device.entity';
import { DeviceService } from 'src/device/device.service';
import { SessionInitDto } from './dto/session-init.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { Session } from './entities/session.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { IdsDto } from './dto/ids.dto';
import { Repository } from 'typeorm';
import { DateTime } from 'luxon';

@Injectable()
export class SessionService {
  private timeout: NodeJS.Timeout;

  constructor(
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
    private deviceService: DeviceService,
    private userService: UsersService,
    private calendarService: CalendarService,
  ) {}

  async handleInitialisation(data: SessionInitDto) {
    const user = await this.userService.findOne(data.userId);
    const device = await this.deviceService.findOne(data.deviceId);

    //validating user and his device(if not exists, or already online return)
    if (!device || !user || device.online) return;
    await this.deviceService.updateStatus(data.deviceId, true);
    const session = await this.createSession(user, device);

    const ids: IdsDto = {
      userId: data.userId,
      deviceId: data.deviceId,
      sessionId: session.id,
    };

    this.setCloseTimeout(ids);

    return session.id;
  }

  async handlePing(ids: IdsDto) {
    const device = await this.deviceService.findOne(ids.deviceId);
    //validating device and it`s status(if not exists or offline, return)
    if (!device || !device.online) return;

    clearTimeout(this.timeout);
    this.setCloseTimeout(ids);
    return "Ping succeed";
  }

  private async close(ids: IdsDto) {
    let session = await this.sessionRepository.findOneBy({
      id: ids.sessionId,
    });
    //validating session(if not exists, return)
    if (!session) return;

    const endTime = this.userTime(session.timeZone);
    session = await this.setEndTime(ids.sessionId, endTime);

    const deviceName = await this.deviceService.deviceName(ids.deviceId);
    this.sendDataToCalendar(ids.userId, session, deviceName);

    return await this.sessionRepository.remove(session);
  }

  private async setCloseTimeout(ids: IdsDto) {
    this.timeout = setTimeout(() => {
      this.close(ids);
    }, 15000);
  }

  async sendDataToCalendar(
    userId: number,
    session: Session,
    deviceName: string,
  ) {
    const user = await this.userService.findOne(userId);

    const eventData: CreateEventDto = {
      refreshToken: user.refreshToken,
      accessToken: user.accessToken,
      startTime: session.startTime,
      endTime: session.endTime,
      deviceName: deviceName,
    };

    await this.calendarService.addEvent(eventData);
  }

  private async createSession(user: User, device: Device) {
    const userTimeZone = await this.userTimeZone(
      user.accessToken,
      user.refreshToken,
    );
    const startTime = this.userTime(userTimeZone);

    const sessionEntity = this.sessionRepository.create({
      timeZone: userTimeZone,
      startTime: startTime,
      endTime: '',
      device: device,
      user: user,
    });

    return await this.sessionRepository.save(sessionEntity);
  }

  private userTime(timeZone: string) {
    return DateTime.now().setZone(timeZone).toISO();
  }

  private async userTimeZone(accessToken: string, refreshToken: string) {
    return await this.calendarService.userTimeZone(accessToken, refreshToken);
  }

  private async setEndTime(id: number, endTime: string) {
    await this.sessionRepository.update(id, {
      endTime: endTime,
    });
    return await this.findOne(id);
  }

  private async findOne(sessionId: number) {
    return await this.sessionRepository.findOneBy({
      id: sessionId,
    });
  }
}
