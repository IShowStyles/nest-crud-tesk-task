import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoomEntity } from '../rooms/entities/room.entity';
import { BookingsEntity } from '../bookings/entities/bookings.entity';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      uri: process.env.DATABASE_URL,
      models: [RoomEntity, BookingsEntity],
      autoLoadModels: false,
      synchronize: false,
    }),
  ],
})
export class DatabaseModule {}
