import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { setupSwagger } from './swagger';
import { registerGlobals } from './globalSetup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  registerGlobals(app);
  await app.listen(+process.env.PORT);
  console.log(`Application is running on: ${await app.getUrl()}/api`);
}
bootstrap();
