import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { Event } from './event.entity';

@Entity('bookings')
@Unique(['event_id', 'user_id'])
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  event_id: number;

  @Column({ type: 'varchar' })
  user_id: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => Event, (event) => event.bookings)
  @JoinColumn({ name: 'event_id' })
  event: Event;
}
