import {
  IsString,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  isAvailable: boolean;

  @IsNumber()
  @IsPositive()
  price: number;
}
