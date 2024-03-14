import {
  Column,
  Table,
  Model,
  PrimaryKey,
  DataType,
  AutoIncrement,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table({
  tableName: 'Rooms',
})
export class RoomEntity extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  @ApiProperty({ example: 4, description: 'IDs foreign key' })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  @ApiProperty({ example: 'Common Room', description: 'Room name example' })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  @ApiProperty({
    example: 'Common Room description',
    description: 'Room text description',
  })
  description: string;
  @Column({
    type: DataType.BOOLEAN,
  })
  @ApiProperty({
    example: true,
    description: 'Room isAvailable property',
  })
  isAvailable: boolean;

  @Column({
    type: DataType.NUMBER,
  })
  @ApiProperty({
    example: 19.99,
    description: 'Room price number',
  })
  price: number;
}
