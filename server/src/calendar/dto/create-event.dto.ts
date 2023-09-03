import { IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  startTime: string;

  @IsString()
  endTime: string;

  @IsString()
  deviceName: string;

  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}
