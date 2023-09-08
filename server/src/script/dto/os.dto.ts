import { IsString } from 'class-validator';

export class OsDto {
  @IsString()
  type: string;
  @IsString()
  fileFormat: string;
}
