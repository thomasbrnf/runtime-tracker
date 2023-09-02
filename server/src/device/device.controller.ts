import { Controller, Post, Param, Body, UseGuards, Get } from '@nestjs/common';
import { GoogleAuthGuard } from 'src/auth/guards/google-auth.guard';
import { CreateDeviceDto } from './dto/create-device.dto';
import { DeviceService } from './device.service';

@Controller('/users/:userId/devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post('create')
  @UseGuards(GoogleAuthGuard)
  async create(
    @Param('userId') userId: number,
    @Body() createDeviceDto: CreateDeviceDto,
  ) {
    return this.deviceService.createDevice(userId, createDeviceDto);
  }

  @Post(':deviceId/edit')
  @UseGuards(GoogleAuthGuard)
  async edit(
    @Param('deviceId') userId: number,
    @Body() createDeviceDto: CreateDeviceDto,
  ) {
    return this.deviceService.editDevice(userId, createDeviceDto);
  }

  @Post(':deviceId/delete')
  @UseGuards(GoogleAuthGuard)
  async delete(@Param('deviceId') userId: number) {
    return this.deviceService.deleteDevice(userId);
  }

  @Get('')
  @UseGuards(GoogleAuthGuard)
  async userDevices(@Param('userId') userId: number) {
    return this.deviceService.getUserDevices(userId);
  }
}
