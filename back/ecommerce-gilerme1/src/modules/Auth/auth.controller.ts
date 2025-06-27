/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')

export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signin')
    login(@Body() body: { email?: string; password?: string }) {
    const { email, password } = body;

    if (!email || !password) {
        return 'Email o password incorrectos'; // Respuesta genérica como pide la consigna
    }
    return this.authService.signin(email, password);
    }

}
