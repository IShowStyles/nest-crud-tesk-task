import { INestApplication } from '@nestjs/common';
import { CustomValidationPipe } from './common/pipes/validation.pipe';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

export function registerGlobals(app: INestApplication) {
  app.useGlobalPipes(new CustomValidationPipe());
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.enableCors({
    origin: '*',
  });
}
