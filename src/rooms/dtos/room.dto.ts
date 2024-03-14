import {
  IsString,
  IsPositive,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class RoomDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsBoolean()
  isAvailable: boolean;

  @IsNumber()
  @IsPositive()
  price: number;
}
