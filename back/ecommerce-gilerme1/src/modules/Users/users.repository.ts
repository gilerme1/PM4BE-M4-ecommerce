/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { User } from 'src/Interfaces/user.interface';

@Injectable()
export class UsersRepository {
    private users: User[] = [
        {
        id: 1,
        email: 'juan.perez@example.com',
        name: 'Juan Perez',
        password: 'hashed1',
        address: '123 St',
        phone: '123-456',
        country: 'Uruguay',
        city: 'Paysandú',
        },
        {
        id: 2,
        email: 'marta@example.com',
        name: 'Marta',
        password: 'hashed2',
        address: '456 St',
        phone: '789-123',
        country: 'Canada',
        city: 'Toronto',
        },
    ];

    // private nextId = 3;

    getUsers() {
        return this.users.map(({ password, ...user }) => user);  // Omitimos la contraseña al devolver usuarios
    }

    getAllUsers() {
        return this.users; // Incluye passwords, solo se usa internamente
    }

    getById(id: number) {
        const user = this.users.find(u => u.id === id);
        if (!user) return null;
        const { password, ...userWithoutPassword } = user;  // Omitimos password
        return userWithoutPassword;
    }

    createUser(user: Omit<User, 'id'>) {
        // const newUser = { id: this.nextId++, ...user };
        const newUser = { id: this.users.length + 1, ...user };
        this.users.push(newUser);
        return newUser.id;
    }

    updateUser(id: number, data: Partial<User>) {
        const index = this.users.findIndex(u => u.id === id);
        if (index === -1) return null;              // Si no encuentra usuario con ese id, findIndex devuelve -1.
        this.users[index] = { ...this.users[index], ...data };
        return id;
    }

    deleteUser(id: number) {
        const largoInicial = this.users.length;
        this.users = this.users.filter(u => u.id !== id);
        if (this.users.length < largoInicial) {
            return id; 
        } else {
            return null; 
        }
}
}
