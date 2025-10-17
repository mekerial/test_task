import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { BookingService } from '../services/booking.service';
import { ReserveBookingDto } from '../dto/reserve-booking.dto';

@Controller('api/bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('reserve')
  @HttpCode(HttpStatus.CREATED)
  async reserveBooking(@Body() reserveBookingDto: ReserveBookingDto) {
    return await this.bookingService.reserveBooking(reserveBookingDto);
  }
}
