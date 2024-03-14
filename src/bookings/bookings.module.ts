import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { BookingsEntity } from './entities/bookings.entity';
import { bookingsProviders } from './booking.providers';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoomEntity } from '../rooms/entities/room.entity';

@Module({
  imports: [SequelizeModule.forFeature([BookingsEntity, RoomEntity])],
  providers: [...bookingsProviders, BookingsService],
  controllers: [BookingsController],
})
export class BookingsModule {}
