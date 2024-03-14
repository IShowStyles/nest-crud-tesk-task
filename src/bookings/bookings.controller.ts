import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsEntity } from './entities';
import { BookingDto } from './dtos';
import {
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { CustomLog } from '../common/decorators/custom-logger.decorator';
import { RoomAvailableGuard } from '../common/guards/room-available.guard';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new booking' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: BookingsEntity,
  })
  @ApiBody({ type: BookingDto })
  @UseGuards(RoomAvailableGuard)
  @CustomLog({ timestamp: true, propertyName: 'Rooms' })
  @HttpCode(201)
  async create(
    @Body() createBookingDto: BookingDto,
  ): Promise<BookingsEntity> {
    return await this.bookingsService.createBooking(createBookingDto);
  }
  @Get()
  @ApiOperation({ summary: 'Retrieve all bookings' })
  @ApiResponse({
    status: 200,
    description: 'Array of bookings entities',
    type: [BookingsEntity],
  })
  @HttpCode(200)
  @CustomLog({ timestamp: true, propertyName: 'Rooms' })
  async findAll(): Promise<BookingsEntity[]> {
    return await this.bookingsService.findAllBookings();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a booking by its ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Booking ID' })
  @ApiResponse({
    status: 200,
    description: 'Single bookings entity',
    type: BookingsEntity,
  })
  @HttpCode(200)
  @CustomLog({ timestamp: true, propertyName: 'Rooms' })
  async findOne(@Param('id') id: number): Promise<BookingsEntity> {
    return await this.bookingsService.findBookingById(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a booking by its ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Booking ID' })
  @ApiBody({ type: BookingDto })
  @ApiResponse({
    status: 200,
    description: 'Updated bookings entity',
    type: BookingsEntity,
  })
  @HttpCode(200)
  @CustomLog({ timestamp: true, propertyName: 'Rooms' })
  async update(
    @Param('id') id: number,
    @Body() updateBookingDto: BookingDto,
  ): Promise<BookingsEntity> {
    return await this.bookingsService.updateBooking(+id, updateBookingDto);
  }

  @Put('/upsert/:id')
  @ApiOperation({ summary: 'Upsert a booking by its ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Booking ID for upsert operation',
  })
  @ApiResponse({
    status: 200,
    description: 'Upserted bookings entity',
    type: BookingsEntity,
  })
  @HttpCode(200)
  @ApiBody({ type: BookingDto })
  @CustomLog({ timestamp: true, propertyName: 'Rooms' })
  async updateOrCreate(
    @Param('id') id: number,
    @Body() dto: BookingDto,
  ): Promise<BookingsEntity> {
    return await this.bookingsService.updateOrCreate(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a booking by its ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Booking ID' })
  @ApiResponse({
    status: 204,
    description: 'Booking has been deleted',
  })
  @HttpCode(204)
  @CustomLog({ timestamp: true, propertyName: 'Rooms' })
  async remove(@Param('id') id: number): Promise<void> {
    await this.bookingsService.deleteBooking(+id);
  }
}
