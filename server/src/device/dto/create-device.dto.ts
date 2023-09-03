import { IsBoolean, IsString } from 'class-validator';

export class CreateDeviceDto {
  @IsString()
  name: string;

  @IsBoolean()
  online: boolean;
}
