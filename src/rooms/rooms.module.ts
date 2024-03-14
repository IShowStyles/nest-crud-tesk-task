import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { RoomEntity } from './entities/room.entity';
import { roomsProviders } from './rooms.providers';
import { BookingsService } from '../bookings/bookings.service';

@Module({
  imports: [],
  providers: [RoomsService, ...roomsProviders, RoomEntity],
  controllers: [RoomsController],
})
export class RoomsModule {}
