import { ValidationPipe } from '@nestjs/common';

export const globalPipes = [
  new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }),
];
