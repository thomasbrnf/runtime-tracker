import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;
  @IsString()
  email: string;
  @IsString()
  accessToken: string;
  @IsString()
  refreshToken: string;
}
