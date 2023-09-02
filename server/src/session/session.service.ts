import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SessionService {
  // private session: Session;
  // private readonly logger = new Logger(SessionService.name);
  // initialise(userId: number, deviceId: number, data: Data) {
  //     this.session = new Session(data);
  //     setTimeout(() => this.close(data), 10000);
  // }
  // ping(userId: number, deviceId: number, data: Data) {
  //     clearTimeout(this.session.timeout);
  //     this.session.timeout = setTimeout(() => this.close(data), 10000);
  // }
  // private close(data: Data) {
  //    this.session.setEndTime(data);
  //    this.logger.log(this.session.getEndTime());
  // }

  constructor( 
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>
  ) {}

  async initialise(deviceId: number) {
    
  }
}
