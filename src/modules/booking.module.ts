import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from '../controllers/booking.controller';
import { BookingService } from '../services/booking.service';
import { Booking } from '../entities/booking.entity';
import { Event } from '../entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Event])],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
