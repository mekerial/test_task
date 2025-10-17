import { Test, TestingModule } from '@nestjs/testing';
import { BookingController } from '../controllers/booking.controller';
import { BookingService } from '../services/booking.service';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('BookingController', () => {
  let controller: BookingController;
  let service: BookingService;

  const mockBookingService = {
    reserveBooking: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingController],
      providers: [
        {
          provide: BookingService,
          useValue: mockBookingService,
        },
      ],
    }).compile();

    controller = module.get<BookingController>(BookingController);
    service = module.get<BookingService>(BookingService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should reserve a booking successfully', async () => {
    const reserveDto = { event_id: 1, user_id: 'user123' };
    const expectedBooking = {
      id: 1,
      event_id: 1,
      user_id: 'user123',
      created_at: new Date(),
    };

    mockBookingService.reserveBooking.mockResolvedValue(expectedBooking);

    const result = await controller.reserveBooking(reserveDto);
    expect(result).toEqual(expectedBooking);
    expect(service.reserveBooking.bind(service)).toHaveBeenCalledWith(
      reserveDto,
    );
  });

  it('should throw ConflictException when user already booked', async () => {
    const reserveDto = { event_id: 1, user_id: 'user123' };

    mockBookingService.reserveBooking.mockRejectedValue(
      new ConflictException('User has already booked a seat for this event'),
    );

    await expect(controller.reserveBooking(reserveDto)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should throw NotFoundException when event not found', async () => {
    const reserveDto = { event_id: 999, user_id: 'user123' };

    mockBookingService.reserveBooking.mockRejectedValue(
      new NotFoundException('Event not found'),
    );

    await expect(controller.reserveBooking(reserveDto)).rejects.toThrow(
      NotFoundException,
    );
  });
});
