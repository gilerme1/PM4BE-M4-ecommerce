/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './createUser.dto';
import { IsString } from 'class-validator';

export class SignupUserDto extends CreateUserDto {
    
    @ApiProperty({ example: 'Password123!' })
    @IsString()
    confirmPassword: string;
}