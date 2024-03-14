import { RoomEntity } from './entities/room.entity';

export const roomsProviders = [
  {
    provide: 'RoomEntityRepository',
    useValue: RoomEntity,
  },
];
