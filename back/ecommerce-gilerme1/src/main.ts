/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ProductsSeed } from './seeds/products/products.seed';
import { CategoriesSeed } from './seeds/categories/categories.seed';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Demo Nest')
    .setDescription( `Esta es una API construida con Nest para ser empleada en el modulo 4 del Backend de Fullstack Devs`)
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');

  try {
    const categoriesSeed = app.get(CategoriesSeed);
    await categoriesSeed.seed();
    console.log('✅ Categorías insertadas.');

    const productsSeed = app.get(ProductsSeed);
    await productsSeed.seed();
    console.log('✅ Productos insertados.');
  } catch (error) {
    console.error('❌ Error en seeding:', error);
  }

}
bootstrap();
