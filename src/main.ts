import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { globalPipes } from './setup/global/validation.pipe';
import { swaggerSetup } from './setup/swagger/swagger-setup.helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(...globalPipes);
  swaggerSetup(app);
  await app.listen(3000);
}
bootstrap();
