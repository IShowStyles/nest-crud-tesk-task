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
      // host: process.env.DB_HOST,
      // port: parseInt(process.env.DB_PORT, 10) || 5432,
      // username: process.env.DB_USER,
      // password: process.env.DB_PASS,
      // database: process.env.DB_NAME,
      ssl: true,
      uri: process.env.DATABASE_URL,
      models: [RoomEntity, BookingsEntity],
      autoLoadModels: false,
      synchronize: false,
    }),
  ],
})
export class DatabaseModule {}
