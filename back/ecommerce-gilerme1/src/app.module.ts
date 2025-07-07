/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersModule } from './modules/Users/users.module';
import { ProductsModule } from './modules/Products/products.module';
import { AuthModule } from './modules/Auth/auth.module';
import { AuthGuard } from './guards/auth.guards';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from "./config/typeorm"; 
import { OrdersModule } from './modules/Orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],            // <--- Aquí cargas tu configuración registrada como 'typeorm'
      envFilePath: "./.env.development" // Puedes mantener esto si quieres especificar el archivo .env
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // <--- CORRECCIÓN 2: La función useFactory debe retornar DIRECTAMENTE las opciones de TypeORM
        return configService.get('typeorm') as TypeOrmModuleOptions; 
      }
    }),
    UsersModule,
    ProductsModule,
    OrdersModule,
    AuthModule
  ],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
})
export class AppModule {}