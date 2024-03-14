import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomLog } from './common/decorators/custom-logger.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @CustomLog({ timestamp: true, propertyName: 'App' })
  getHello(): string {
    return this.appService.getHello();
  }
}
