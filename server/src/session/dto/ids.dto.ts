import { IsNumber } from 'class-validator';

export class IdsDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  deviceId: number;

  @IsNumber()
  sessionId: number;
}
