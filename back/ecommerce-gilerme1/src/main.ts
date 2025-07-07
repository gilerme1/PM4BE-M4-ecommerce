/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes( new ValidationPipe(
    { 
      whitelist: true,              // elimina propiedades no incluidas en el DTO
      forbidNonWhitelisted: true,   // lanza error si se reciben propiedades no permitidas
      transform: true,              // transforma automáticamente payloads a los tipos definidos en los DTOs
      exceptionFactory: (errors) => {
        const cleanErrors = errors.map(error => {
          return {
            property: error.property,
            constraints: error.constraints, // Aquí están los mensajes de error (ej. isString, isNotEmpty)
          };
        });
        return new BadRequestException({ 
          alert: 'Se han encontrado errores de validación en la solicitud!',
          errors: cleanErrors,
        });
      },
    }),
  );

  app.use(loggerGlobal)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
