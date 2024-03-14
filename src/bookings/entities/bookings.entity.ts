import {
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { RoomEntity } from '../../rooms/entities/room.entity';
import { BelongsTo } from 'sequelize-typescript';

@Table({
  tableName: 'Bookings',
})
export class BookingsEntity extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  @ApiProperty({ example: 2, description: 'IDs foreign key' })
  id: number;

  @ForeignKey(() => RoomEntity)
  @Column({
    type: DataType.NUMBER,
    unique: true,
  })
  @ApiProperty({ example: 1, description: 'Quantity count' })
  roomId: number;

  // @Column({
  //   type: DataType.INTEGER,
  // })
  // @ApiProperty({ example: 1, description: 'Quantity count' })
  // quantity: number;

  @Column({
    type: DataType.STRING,
  })
  @ApiProperty({
    example: getRandomISO8601Date(),
    description: 'Start date for booking',
  })
  startDate: string;

  @Column({
    type: DataType.STRING,
  })
  @ApiProperty({
    example: getRandomISO8601Date(),
    description: 'End date for booking',
  })
  endDate: string;

  @BelongsTo(() => RoomEntity)
  room: RoomEntity;
}

function getRandomISO8601Date() {
  const date = new Date();
  date.setDate(date.getDate() + Math.floor(Math.random() * 10));
  return date.toISOString();
}
