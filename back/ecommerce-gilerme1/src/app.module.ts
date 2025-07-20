/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersModule } from './modules/Users/users.module';
import { ProductsModule } from './modules/Products/products.module';
import { AuthModule } from './modules/Auth/auth.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from "./config/typeorm"; 
import { OrdersModule } from './modules/Orders/orders.module';
import { SeedsModule } from './seeds/seeds.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env.development',
      load: [typeOrmConfig],
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
    AuthModule,
    SeedsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}