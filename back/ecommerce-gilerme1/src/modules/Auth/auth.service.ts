/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../Users/users.repository';
import { SignupUserDto  } from '../Users/signupUserDto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../Users/createUser.dto';

@Injectable()

@Injectable()
export class AuthService {
    constructor(
        private readonly usersRepo: UsersRepository,
        private readonly jwtService: JwtService,
    ) {}

    async signUp(dto: SignupUserDto) {
        const dbUser = await this.usersRepo.getUsersByEmail(dto.email);
        if (dbUser) {
            throw new BadRequestException('El email ya está registrado');
        }

        if (dto.password !== dto.confirmPassword) {
            throw new BadRequestException('Las contraseñas no coinciden');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        // Aseguramos tipado correcto como CreateUserDto
        const newUser: CreateUserDto = {
            name: dto.name,
            email: dto.email,
            password: hashedPassword,
            phone: dto.phone,
            address: dto.address,
            city: dto.city,
            country: dto.country,
        };

        const created = await this.usersRepo.createUser(newUser);
        return {
            id: created.id,
            email: created.email,
            message: 'Usuario creado exitosamente',
        };
    }

    async signIn(email: string, password: string) {
        const dbUser = await this.usersRepo.getUsersByEmail(email);
        if (!dbUser) {
            throw new BadRequestException('Usuario no encontrado');
        }
        const isPasswordValid = dbUser && (await bcrypt.compare(password, dbUser.password));

        // Mensaje de error genérico
        if (!isPasswordValid) {
        throw new BadRequestException('Credenciales(email/password) inválidas');
        }

        const payload = {
            sub: dbUser.id,
            id: dbUser.id,
            email: dbUser.email,
            role: dbUser.role,
        };

        const token = this.jwtService.sign(payload, { expiresIn: '1h' });  // 🔐 Token válido por 1 hora

        return {
        access_token: token,
        user: {
            id: dbUser.id,
            email: dbUser.email,
            },
        };
    }
}

