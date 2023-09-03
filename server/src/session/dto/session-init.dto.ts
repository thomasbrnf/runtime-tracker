import { IsNumber, IsString } from 'class-validator';

export class SessionInitDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  deviceId: number;
}
