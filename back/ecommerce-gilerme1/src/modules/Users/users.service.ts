/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from 'src/Interfaces/user.interface';

@Injectable()
export class UsersService {
    constructor(private repo: UsersRepository) {}

    getUsers() {
        return this.repo.getUsers();
    }

    getAllWithPasswords() {
        return this.repo.getAllUsers();
    }

    getUserById(id: number) {
        return this.repo.getById(id);
    }

    createUser(user: Omit<User, 'id'>) {
        return this.repo.createUser(user);
    }

    updateUser(id: number, user: Partial<User>) {
        return this.repo.updateUser(id, user);
    }

    deleteUser(id: number) {
        return this.repo.deleteUser(id);
    }
}
