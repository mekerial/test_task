import { IsNotEmpty, IsString, IsInt, Min, Length } from 'class-validator';

export class ReserveBookingDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  event_id: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 128)
  user_id: string;
}
