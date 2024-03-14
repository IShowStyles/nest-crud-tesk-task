import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { RoomEntity } from './entities/room.entity';
import { roomsProviders } from './rooms.providers';
import { BookingsEntity } from '../bookings/entities/bookings.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([BookingsEntity, RoomEntity])],
  providers: [RoomsService, ...roomsProviders, RoomEntity],
  controllers: [RoomsController],
})
export class RoomsModule {}
