import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BookingsEntity } from './entities';
import {
  BOOKING_ALREADY_EXIST,
  BOOKING_CONFLICT,
  BOOKING_NOT_FOUND,
} from './booking.constants';
import { Op } from 'sequelize';
import { BookingDto } from './dtos';
import { RoomEntity } from '../rooms/entities/room.entity';
import dateValidation from '../common/utils/date.validation';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(BookingsEntity)
    private bookingsModel: typeof BookingsEntity,
    @InjectModel(RoomEntity)
    private roomModel: typeof RoomEntity,
  ) {}

  async checkForBookingConflicts(
    roomId: number,
    startDate: string,
    endDate: string,
    excludeBookingId?: number,
  ): Promise<boolean> {
    if (isNaN(roomId)) {
      throw new Error('Invalid room ID');
    }

    const conflictCondition = {
      roomId,
      [Op.or]: [
        {
          startDate: {
            [Op.lte]: startDate,
          },
          endDate: {
            [Op.gte]: startDate,
          },
        },
        {
          startDate: {
            [Op.lte]: endDate,
          },
          endDate: {
            [Op.gte]: endDate,
          },
        },
      ],
    };

    if (excludeBookingId) {
      conflictCondition['roomId'] = excludeBookingId;
    }

    if (!dateValidation(startDate, endDate)) {
      throw new BadRequestException('Invalid date');
    }
    const conflictingBookings = await this.bookingsModel.findOne({
      where: conflictCondition,
    });

    if (!conflictingBookings) {
      return false;
    }

    return !!conflictingBookings;
  }

  async createBooking(dto: BookingDto): Promise<BookingsEntity> {
    try {
      const { roomId, startDate, endDate } = dto;
      console.log(roomId, startDate, endDate);
      const conflictingBookings = await this.checkForBookingConflicts(
        roomId,
        startDate,
        endDate,
      );

      if (conflictingBookings) {
        throw new BadRequestException(BOOKING_ALREADY_EXIST);
      }

      await this.bookRoom(roomId);
      const booking = new BookingsEntity({
        startDate: startDate,
        endDate: endDate,
        roomId: roomId,
      });

      await booking.save();
      return booking;
    } catch (e) {
      throw new BadRequestException('Smth went wrong:' + e.message);
    }
  }

  async findAllBookings(): Promise<BookingsEntity[]> {
    try {
      const bookings = await this.bookingsModel.findAll({
        include: { all: true },
      });

      if (!bookings.length) {
        return [];
      }
      return bookings;
    } catch (e) {
      throw new BadRequestException('Smth went wrong:' + e.message);
    }
  }

  async findBookingById(id: number): Promise<BookingsEntity> {
    try {
      const booking = await this.bookingsModel.findByPk(id, {
        include: { all: true },
      });
      if (!booking) {
        throw new NotFoundException(BOOKING_NOT_FOUND);
      }
      return booking;
    } catch (e) {
      throw new BadRequestException('Smth went wrong:' + e.message);
    }
  }

  async updateBooking(id: number, dto: BookingDto): Promise<BookingsEntity> {
    try {
      const currentBooking = await this.findBookingById(id); // This already handles the NotFoundException

      const conflictExists = await this.checkForBookingConflicts(
        dto.roomId || currentBooking.roomId,
        dto.startDate || currentBooking.startDate,
        dto.endDate || currentBooking.endDate,
      );

      if (conflictExists) {
        throw new BadRequestException(BOOKING_CONFLICT);
      }

      await this.bookingsModel.update(dto, { where: { id } });
      return this.findBookingById(id);
    } catch (e) {
      throw new BadRequestException('Smth went wrong:' + e.message);
    }
  }

  async bookRoom(id: number): Promise<string> {
    try {
      const room = await this.roomModel.findOne({
        where: { id: id },
      });

      if (!room) {
        throw new NotFoundException(`Room with ID ${id} not found`);
      }

      if (!room.isAvailable) {
        throw new BadRequestException(`Room with ID ${id} is already booked`);
      }

      room.isAvailable = false;
      await room.save();

      return `Room with ID ${id} has been successfully booked`;
    } catch (e) {
      throw new BadRequestException('Smth went wrong:' + e.message);
    }
  }

  async updateOrCreate(id: number, dto: BookingDto): Promise<BookingsEntity> {
    try {
      let data = undefined;
      const isBookings = await this.findBookingById(id);
      if (isBookings) {
        data = await this.updateBooking(id, dto);
        return data;
      }
      data = await this.createBooking(dto as Required<BookingDto>);
      return data;
    } catch (e) {
      throw new BadRequestException('Smth went wrong:' + e.message);
    }
  }

  async deleteBooking(id: number): Promise<void> {
    try {
      const booking = await this.findBookingById(id);
      await this.roomModel.update(
        { isAvailable: true },
        { where: { id: booking.roomId } },
      );
      await booking.destroy();
    } catch (e) {
      throw new BadRequestException('Smth went wrong:' + e.message);
    }
  }
}
