/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './LoginUser.dto';

@Controller('auth')

export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signin')
    login(@Body() loginDto: LoginUserDto) {
        const { email, password } = loginDto;
        
        return this.authService.signin(email, password);
    }
}

// if (!email || !password) {      Ya no es necesario porque el ValidationPipe global lo validará.
//     return 'Email o password incorrectos'; 
// }