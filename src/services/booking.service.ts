import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../entities/booking.entity';
import { Event } from '../entities/event.entity';
import { ReserveBookingDto } from '../dto/reserve-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async reserveBooking(reserveBookingDto: ReserveBookingDto): Promise<Booking> {
    const { event_id, user_id } = reserveBookingDto;

    // Проверяем, существует ли событие
    const event = await this.eventRepository.findOne({
      where: { id: event_id },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    // Проверяем, не забронировал ли уже пользователь место на это событие
    const existingBooking = await this.bookingRepository.findOne({
      where: { event_id, user_id },
    });

    if (existingBooking) {
      throw new ConflictException(
        'User has already booked a seat for this event',
      );
    }

    // Проверяем, есть ли свободные места
    const bookedSeats = await this.bookingRepository.count({
      where: { event_id },
    });

    if (bookedSeats >= event.total_seats) {
      throw new ConflictException('No available seats for this event');
    }

    // Создаем новое бронирование
    const booking = this.bookingRepository.create({
      event_id,
      user_id,
    });

    try {
      return await this.bookingRepository.save(booking);
    } catch (error: unknown) {
      // Код ошибки 23505 - уникальное ограничение (PostgreSQL)
      if (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        error.code === '23505'
      ) {
        throw new ConflictException(
          'User has already booked a seat for this event',
        );
      }
      if (error && typeof error === 'object' && 'driverError' in error) {
        const driverError = (error as { driverError: unknown }).driverError;
        if (
          driverError &&
          typeof driverError === 'object' &&
          'code' in driverError &&
          driverError.code === '23505'
        ) {
          throw new ConflictException(
            'User has already booked a seat for this event',
          );
        }
      }
      throw error;
    }
  }
}
