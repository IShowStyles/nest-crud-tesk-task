import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoomEntity } from './entities/room.entity';
import { CreateRoomDto, UpdateRoomDto } from './dtos';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(RoomEntity)
    private roomsModel: typeof RoomEntity,
  ) {}

  async createRoom(dto: CreateRoomDto): Promise<RoomEntity> {
    const existingRoom = await this.roomsModel.findOne({
      where: { name: dto.name },
    });

    if (existingRoom) {
      throw new BadRequestException('Room with the given name already exists');
    }

    const room = new RoomEntity({
      ...dto,
    });

    await room.save();
    return room;
  }

  async findAllRooms(): Promise<RoomEntity[]> {
    return await this.roomsModel.findAll();
  }

  async updateOrCreate(id: number, dto: UpdateRoomDto): Promise<RoomEntity> {
    let data = undefined;
    const room = await this.roomsModel.findOne({
      where: { id },
    });
    if (room!) {
      data = await this.updateRoom(id, dto);
      return data;
    }
    console.log(122112);
    data = await this.createRoom(dto as Required<UpdateRoomDto>);
    return data;
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

  async updateRoom(
    id: number,
    updateRoomDto: UpdateRoomDto,
  ): Promise<RoomEntity> {
    const [updated] = await this.roomsModel.update(updateRoomDto, {
      where: { id: id },
    });
    if (!updated) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
    return await this.findRoomById(id);
  }

  async deleteRoom(id: number): Promise<void> {
    const room = await this.findRoomById(id);
    await room.destroy();
  }
}
