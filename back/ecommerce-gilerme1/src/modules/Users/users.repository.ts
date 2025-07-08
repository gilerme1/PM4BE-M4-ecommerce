/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity'; 
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './createUser.dto';

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
    ) {}

    async getUsers() {
        // Excluir password al listar todos los usuarios
        const users = await this.repo.find();
        return users.map(({ password, ...user }) => user);
    }

    async getAllUsers() {
        return this.repo.find(); // Incluye password, solo uso interno
    }

    async getById(id: string) {
        const user = await this.repo.findOneBy({ id });
        if (!user) return null;
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async createUser(userDto: CreateUserDto) {
        const newUser = this.repo.create(userDto); // solo campos válidos
        const savedUser = await this.repo.save(newUser);
        return savedUser.id;
    }

    async updateUser(id: string, user: Partial<CreateUserDto>) {
        const existeUsuario = await this.repo.findOneBy({ id });
        if (!existeUsuario) return null;

        await this.repo.update(id, user);
        return id;
    }

    async deleteUser(id: string) {
        const result = await this.repo.delete(id);
        return result.affected ? id : null;
    } 

    // async findOneByEmail(email: string) {
    //     return await this.users.find((user) => user.email === email)
    // }

}
