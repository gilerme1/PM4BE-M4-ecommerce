/* eslint-disable prettier/prettier */
import { CreateUserDto } from './createUser.dto';
import { IsString } from 'class-validator';

export class SignupUserDto extends CreateUserDto {
    @IsString()
    confirmPassword: string;
}