import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoomEntity } from './entities/room.entity';
import { RoomDto } from './dtos';
import { BookingsEntity } from '../bookings/entities';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(BookingsEntity)
    private bookingsModel: typeof BookingsEntity,
    @InjectModel(RoomEntity)
    private roomsModel: typeof RoomEntity,
  ) {}

  async createRoom(dto: RoomDto): Promise<RoomEntity> {
    try {
      const existingRoom = await this.roomsModel.findOne({
        where: { name: dto.name },
      });

      if (existingRoom) {
        throw new BadRequestException(
          'Room with the given name already exists',
        );
      }

      const room = new RoomEntity({
        ...dto,
      });

      await room.save();
      return room;
    } catch (e) {
      throw new BadRequestException('smth went wrong: ' + e.message);
    }
  }

  async findAllRooms(): Promise<RoomEntity[]> {
    try {
      return await this.roomsModel.findAll();
    } catch (e) {
      throw new BadRequestException('smth went wrong: ' + e.message);
    }
  }

  async updateOrCreate(id: number, dto: RoomDto): Promise<RoomEntity> {
    try {
      let data = undefined;
      const roomID = await this.roomsModel.findOne({
        where: { id },
      });
      const roomNames = await this.getUniqueRoomAndID(id, dto);

      if (roomID) {
        data = await this.updateRoom(id, dto);
        return data;
      }

      if (!roomNames) {
        data = await this.createRoom(dto as Required<RoomDto>);
        console.log(123);
        return data;
      }
    } catch (e) {
      throw new BadRequestException('smth went wrong: ' + e.message);
    }
  }

  async findRoomById(id: number): Promise<RoomEntity> {
    try {
      const room = await this.roomsModel.findOne({
        where: { id },
      });
      if (!room) {
        throw new NotFoundException(
          'Room with the specified ID does not exist',
        );
      }
      return room;
    } catch (e) {
      throw new BadRequestException('smth went wrong: ' + e.message);
    }
  }

  async updateRoom(id: number, updateRoomDto: RoomDto): Promise<RoomEntity> {
    try {
      const room = await this.roomsModel.findOne({
        where: { id },
      });

      if (!room) {
        throw new NotFoundException(`Room with ID ${id} not found`);
      }

      await room.update(updateRoomDto);
      return room;
    } catch (e) {
      throw new BadRequestException('Smth went wrong:' + e.message);
    }
  }

  async getUniqueRoomAndID(id: number, dto: RoomDto): Promise<boolean> {
    try {
      const room = await this.roomsModel.findOne({
        where: { id: id },
      });
      if (room) {
        return false;
      }

      const existingRoom = await this.roomsModel.findOne({
        where: { name: dto.name, description: dto.description },
      });

      if (!existingRoom) {
        return false;
      }

      return !!room;
    } catch (e) {
      throw new BadRequestException('smth went wrong: ' + e.message);
    }
  }

  async deleteRoom(id: number): Promise<void> {
    try {
      const room = await this.findRoomById(id);
      await this.bookingsModel.destroy({
        where: { roomId: id },
      });
      await room.destroy();
    } catch (e) {
      throw new BadRequestException('smth went wrong: ' + e.message);
    }
  }
}
