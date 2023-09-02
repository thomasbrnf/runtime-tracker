import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  Column,
} from 'typeorm';
import { Session } from 'src/session/entities/session.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  status: string;

  @ManyToOne(() => User, (user) => user.devices)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Session, (session) => session.device)
  session: Session;
}
