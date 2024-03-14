import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto, UpdateRoomDto } from './dtos';
import { RoomEntity } from './entities/room.entity';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { CustomLog } from '../common/decorators/custom-logger.decorator';

@ApiTags('Rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new room',
    description: 'Create a new room with the given details.',
  })
  @ApiResponse({
    status: 201,
    description: 'The room has been successfully created.',
    type: RoomEntity,
  })
  @ApiBody({ type: CreateRoomDto })
  @HttpCode(HttpStatus.CREATED)
  @CustomLog({ timestamp: true, propertyName: 'Rooms' })
  async create(@Body() createRoomDto: CreateRoomDto): Promise<RoomEntity> {
    console.log('createRoomDto', createRoomDto);
    return await this.roomsService.createRoom(createRoomDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all rooms',
    description: 'Retrieve a list of all rooms.',
  })
  @ApiResponse({
    status: 200,
    description: 'A list of rooms.',
    type: [RoomEntity], // Note: Use an array for indicating multiple items
  })
  @CustomLog({ timestamp: true, propertyName: 'Rooms' })
  async findAll(): Promise<RoomEntity[]> {
    return await this.roomsService.findAllRooms();
  }
  @Get(':id')
  @ApiOperation({
    summary: 'Get a room by ID',
    description: 'Retrieve details of a room by its ID.',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the room to retrieve.',
  })
  @ApiResponse({
    status: 200,
    description: 'The room details.',
    type: RoomEntity,
  })
  @HttpCode(HttpStatus.OK)
  @CustomLog({ timestamp: true, propertyName: 'Rooms' })
  async findOne(@Param('id') id: number): Promise<RoomEntity> {
    return await this.roomsService.findRoomById(+id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a room',
    description: 'Update the details of an existing room by its ID.',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the room to update.',
  })
  @ApiResponse({
    status: 200,
    description: 'The updated room details.',
    type: RoomEntity,
  })
  @ApiBody({ type: UpdateRoomDto })
  @CustomLog({ timestamp: true, propertyName: 'Rooms' })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: number,
    @Body() updateRoomDto: UpdateRoomDto,
  ): Promise<RoomEntity> {
    return await this.roomsService.updateRoom(+id, updateRoomDto);
  }

  @Put('/upsert/:id')
  @ApiOperation({
    summary: 'Upsert a room',
    description:
      'Update an existing room or create a new one if it does not exist.',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the room to upsert.',
  })
  @ApiResponse({
    status: 200,
    description: 'The upserted room details.',
    type: RoomEntity,
  })
  @ApiBody({ type: CreateRoomDto })
  @CustomLog({ timestamp: true, propertyName: 'Rooms' })
  @HttpCode(HttpStatus.OK)
  async updateOrCreate(
    @Param('id') id: number,
    @Body() dto: CreateRoomDto,
  ): Promise<RoomEntity> {
    return await this.roomsService.updateOrCreate(+id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete a room',
    description: 'Remove a room from the system by its ID.',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the room to delete.',
  })
  @ApiResponse({
    status: 204,
    description: 'The room has been successfully deleted.',
  })
  @CustomLog({ timestamp: true, propertyName: 'Rooms' })
  async remove(@Param('id') id: number): Promise<void> {
    await this.roomsService.deleteRoom(+id);
  }
}
