import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { exec } from 'pkg';
import { DataDto } from './dto/data.dto';
import { DeviceService } from 'src/device/device.service';
import { Device } from 'src/device/entities/device.entity';
import { ExecutableDto } from './dto/executable.dto';
import { OsDto } from './dto/os.dto';
const fs = require('fs/promises');

@Injectable()
export class ScriptService {
  constructor(private deviceServices: DeviceService) {}

  async fetchExecutable(data: DataDto) {
    const device = await this.fetchDevice(data.deviceId);

    const os: OsDto = await this.getOsType(device.os);
    const executableData: ExecutableDto = {
      device: device,
      os: os,
      userId: data.userId,
    };
    await this.generateExecutable(executableData);
    await this.deleteExecutableWithDelay(device.name, os.fileFormat);
    return await fs.readFile(
      join(
        process.cwd(),
        `./src/script/executable/${device.name}-time-tracker.${os.fileFormat}`,
      ),
    );
  }
  async deleteExecutableWithDelay(deviceName: string, fileFormat: string) {
    new Promise((resolve) => {
      setTimeout(() => {
        this.deleteExecutable(deviceName, fileFormat);
        resolve('Executable deleted');
      }, 5000);
    });
  }

  async generateExecutable(data: ExecutableDto) {
    await this.createScript(data.device, data.userId);

    await exec([
      `--output=/server/src/script/executable/${data.device.name}-time-tracker`,
      `--targets=${data.os.type}`,
      '--no-verify',
      `/server/src/script/template/${data.device.name}_script.js`,
    ]);

    this.deleteScript(data.device.name);
  }

  async createScript(deviceData: Device, userId: number) {
    await fs.copyFile(
      join(process.cwd(), './src/script/template/script.js'),
      (process.cwd(), `./src/script/template/${deviceData.name}_script.js`),
    );
    let file = await fs.readFile(
      join(process.cwd(), `./src/script/template/${deviceData.name}_script.js`),
      'utf8',
    );

    file = await file.replace(/const userId = \d+/, `const userId = ${userId}`);
    file = await file.replace(
      /const deviceId = \d+/,
      `const deviceId = ${deviceData.id}`,
    );

    await fs.writeFile(
      join(process.cwd(), `./src/script/template/${deviceData.name}_script.js`),
      file,
      { encoding: 'utf8' },
    );
  }

  async getOsType(os: string) {
    let type = new OsDto();
    switch (os) {
      case 'MacOS': {
        type.type = 'node18-darwin-arm64';
        type.fileFormat = 'app';
        break;
      }
      case 'Windows': {
        type.type = 'node18-win-x64';
        type.fileFormat = 'exe';
        break;
      }
      case 'Linux': {
        type.type = 'node18-linux-arm64';
        type.fileFormat = 'elf';
        break;
      }
    }

    return type;
  }

  async deleteExecutable(name: string, fileType: string) {
    await fs.unlink(
      (process.cwd(),
      `./src/script/executable/${name}-time-tracker.${fileType}`),
    );
  }

  async fetchDevice(deviceId: number) {
    return await this.deviceServices.findOne(deviceId);
  }

  async deleteScript(name: string) {
    await fs.unlink((process.cwd(), `./src/script/template/${name}_script.js`));
  }
}
