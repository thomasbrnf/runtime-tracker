import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(userData: CreateUserDto) {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async findOne(id: number) {
    return this.userRepository.findOneBy({
      id: id,
    });
  }

  async findByEmail(email: string) {
    return this.userRepository.findOneBy({
      email: email,
    });
  }

  async getUsers() {
    return this.userRepository.find();
  }

  async updateUser(id: number, userData: CreateUserDto) {
    return this.userRepository.update(id, {
      email: userData.email,
      username: userData.username,
      accessToken: userData.accessToken,
    });
  }
}
