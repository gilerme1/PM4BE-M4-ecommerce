/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/modules/Users/users.repository';

@Injectable()

export class AuthService {
    constructor(private readonly usersRepo: UsersRepository) {}

    async signin(email: string, password: string): Promise<string> {
        // if (!email || !password) return 'Email o password incorrectos';  Ya no es necesario porque el ValidationPipe global lo validará.
        const user = (await this.usersRepo.getAllUsers()).find(
            (user) => user.email === email && user.password === password);

        if (!user) return 'Email o password incorrectos';

        return 'Login exitoso';
    }
}
