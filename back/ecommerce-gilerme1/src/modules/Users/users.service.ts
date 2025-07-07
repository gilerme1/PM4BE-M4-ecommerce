/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './createUser.dto';

@Injectable()
export class UsersService {
    constructor(private repo: UsersRepository) {}

    async getUsers() {
        return await this.repo.getUsers();
    }

    async getAllWithPasswords() {
        return await this.repo.getAllUsers();
    }

    async getUserById(id: string) {
        return await this.repo.getById(id);
    }

    async createUser(user: CreateUserDto) {
        return await this.repo.createUser(user);
    }

    async updateUser(id: string, user: Partial<CreateUserDto>) {
    return this.repo.updateUser(id, user);
    }

    async deleteUser(id: string) {
        return await this.repo.deleteUser(id);
    }
}

