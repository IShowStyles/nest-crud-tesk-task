import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { RoomEntity } from '../../rooms/entities/room.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RoomAvailableGuard implements CanActivate {
  constructor(
    @InjectModel(RoomEntity)
    private roomModel: typeof RoomEntity,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const roomId = Number(request.body.roomId);
    return this.checkRoomAvailability(roomId);
  }
  async checkRoomAvailability(id: number): Promise<boolean> {
    const room = await this.roomModel.findOne({
      where: { id: id },
    });

    if (!room) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }

    if (!room.isAvailable) {
      throw new BadRequestException(`Room with ID ${id} is already booked`);
    }

    return true;
  }
}
