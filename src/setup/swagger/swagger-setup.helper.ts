import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { name, version, description } from '../../../package.json';
import { INestApplication } from '@nestjs/common';

export function swaggerSetup(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
