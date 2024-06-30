import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  });

  const port = process.env.SERVER_PORT || 3000;
  const host = process.env.HOST || '0.0.0.0';

  await app.listen(port, host);
}
bootstrap();
