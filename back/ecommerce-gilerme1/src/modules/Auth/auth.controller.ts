/* eslint-disable prettier/prettier */
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './LoginUser.dto';
import { SignupUserDto  } from '../Users/signupUserDto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async signup(@Body() dto: SignupUserDto ) {
        if (dto.password !== dto.confirmPassword) {
            throw new BadRequestException('Las contraseñas no coinciden');
        }
        return this.authService.signUp(dto); // dto tiene todos los campos requeridos
    }

    @Post('signin')
    login(@Body() loginDto: LoginUserDto) {
        const { email, password } = loginDto;
        return this.authService.signIn(email, password);
    }
}
