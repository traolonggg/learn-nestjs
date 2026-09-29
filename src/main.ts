import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HtttpExceptionFilter } from './common/filters/http-exception.filter';
import { AuthGuard } from './common/guard/auth.guard';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new AuthGuard());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalFilters(new HtttpExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
