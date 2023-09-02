import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
} from 'typeorm';
import { Device } from 'src/device/entities/device.entity';
import { Session } from 'src/session/entities/session.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Index({ unique: true })
  @Column()
  email: string;

  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;

  @OneToMany(() => Device, (device) => device.user)
  devices: Device[];

  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[];
}
