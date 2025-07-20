/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { User } from 'src/entities/user.entity'; 
import { AuthModule } from '../Auth/auth.module';

@Module({
    imports: [ TypeOrmModule.forFeature([User]), AuthModule],
    providers: [UsersService, UsersRepository],
    controllers: [UsersController],
    exports: [UsersService, UsersRepository]
})
export class UsersModule {}