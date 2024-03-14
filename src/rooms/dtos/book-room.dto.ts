import { CreateBookingDto } from '../../bookings/dtos';

export class BookRoomDto extends CreateBookingDto {
  roomId: number;
}
