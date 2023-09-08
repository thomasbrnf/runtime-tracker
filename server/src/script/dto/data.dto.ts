import { IsNumber, IsString } from 'class-validator';

export class DataDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  deviceId: number;
}
