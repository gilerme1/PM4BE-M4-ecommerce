/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/modules/Users/users.repository';

@Injectable()

export class AuthService {
    constructor(private readonly usersRepo: UsersRepository) {}

    signin(email: string, password: string): string {
        if (!email || !password) return 'Email o password incorrectos';

        const user = this.usersRepo.getAllUsers().find(
        (user) => user.email === email && user.password === password);

        if (!user) return 'Email o password incorrectos';

        return 'Login exitoso';
    }
}
