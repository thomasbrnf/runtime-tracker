import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async googleLogin(userData: CreateUserDto) {
    const user = await this.userService.findByEmail(userData.email);
    if (user) {
      await this.userService.updateUser(user.id, userData);
      return await this.userService.findByEmail(userData.email);
    }
    return await this.userService.createUser(userData);
  }
}
