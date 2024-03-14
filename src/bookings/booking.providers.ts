import { BookingsEntity } from './entities/bookings.entity';

export const bookingsProviders = [
  {
    provide: 'BookingsEntityRepository',
    useValue: BookingsEntity,
  },
];
