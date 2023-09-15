import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from './entities/device.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
    private userService: UsersService,
  ) {}

  async createDevice(userId: number, deviceData: CreateDeviceDto) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new NotFoundException('user not found');
    const device = this.deviceRepository.create({
      name: deviceData.name,
      os: deviceData.os,
      online: false,
      user: user,
    });
    return this.deviceRepository.save(device);
  }

  async editDevice(deviceId: number, deviceData: CreateDeviceDto) {
    const device = await this.deviceRepository.findOneBy({
      id: deviceId,
    });
    if (!device) throw new NotFoundException('device not found');
    return await this.deviceRepository.update(deviceId, {
      name: deviceData.name,
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

  async findOne(deviceId: number) {
    return await this.deviceRepository.findOneBy({
      id: deviceId,
    });
  }

  async updateStatus(deviceId: number, status: boolean) {
    return await this.deviceRepository.update(deviceId, {
      online: status,
    });
  }

  async deviceName(deviceId: number) {
    const device = await this.findOne(deviceId);

    return device.name;
  }
}
