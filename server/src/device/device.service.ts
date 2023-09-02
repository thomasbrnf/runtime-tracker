import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UsersService } from 'src/users/users.service';
import { Device } from './entities/device.entity';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
    private userService: UsersService,
  ) {}

  async createDevice(userId: number, createDeviceDto: CreateDeviceDto) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new NotFoundException('user not found');
    const device = this.deviceRepository.create({
      ...createDeviceDto,
      user,
    });
    return this.deviceRepository.save(device);
  }

  async editDevice(deviceId: number, createDeviceDto: CreateDeviceDto) {
    const device = await this.deviceRepository.findOneBy({
      id: deviceId,
    });
    if (!device) throw new NotFoundException('device not found');
    return await this.deviceRepository.update(deviceId, {
      ...createDeviceDto,
    });
  }

  async deleteDevice(deviceId: number) {
    const device = await this.deviceRepository.findOneBy({
      id: deviceId,
    });
    if (!device) throw new NotFoundException('device not found');
    return await this.deviceRepository.remove(device);
  }

  async getUserDevices(userId: number) {
    return await this.deviceRepository
      .createQueryBuilder('device')
      .where('device.user_Id = :user_Id', { user_Id: userId })
      .getMany();
  }
}
