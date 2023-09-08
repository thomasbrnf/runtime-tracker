import { IsBoolean, IsEnum, IsString } from 'class-validator';
import { OS } from '../enum/os-enum';

export class CreateDeviceDto {
  @IsString()
  name: string;

  @IsEnum(OS)
  os: OS;

  @IsBoolean()
  online: boolean;
}
