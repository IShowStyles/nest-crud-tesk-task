import { IsInt, IsOptional, IsPositive, IsDateString } from 'class-validator';

export class UpdateBookingDto {
  @IsOptional()
  @IsInt()
  roomId?: number;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}
