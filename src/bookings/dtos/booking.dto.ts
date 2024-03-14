import {
  IsInt,
  IsPositive,
  IsDateString,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class BookingDto {
  @IsInt()
  @IsNotEmpty()
  roomId: number;

  @IsDateString()
  @IsString()
  startDate: string;

  @IsDateString()
  @IsString()
  endDate: string;
}
