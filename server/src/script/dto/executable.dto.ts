import { IsNumber, IsObject, IsString } from 'class-validator';
import { Device } from 'src/device/entities/device.entity';
import { OsDto } from './os.dto';

export class ExecutableDto {
  @IsNumber()
  userId: number;

  @IsObject()
  device: Device;

  @IsObject()
  os: OsDto;
}
