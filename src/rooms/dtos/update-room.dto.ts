import {
  IsString,
  IsInt,
  IsOptional,
  IsPositive,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class UpdateRoomDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  isAvailable: boolean;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price: number;
}
