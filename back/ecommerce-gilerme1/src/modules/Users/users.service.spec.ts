/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './createUser.dto';
import { Role } from '../../roles/roles.enum';

// 🧪 Usuario simulado
const userStub = {
    id: 'uuid-123',
    name: 'Juan Pérez',
    email: 'juan@example.com',
    password: 'Password123!',
    address: 'Calle Falsa 123',
    phone: '099123456',
    country: 'Uruguay',
    city: 'Montevideo',
    role: Role.USER, // 👈 debe coincidir con tu enum
    orders: [], // 
};

describe('UsersService - test', () => {
    let service: UsersService;
    let fakeRepo: Partial<UsersRepository>;

    beforeEach(() => {
        // 🎭 Fake manual del repositorio
        fakeRepo = {
        getUsers: async () => [{ ...userStub }],
        getById: async (id: string) => (id === userStub.id ? { ...userStub } : null),
        createUser: async (dto: CreateUserDto) => ({ id: 'uuid-123', email: dto.email }),
        updateUser: async (id: string, dto: Partial<CreateUserDto>) => (id === userStub.id ? id : null),
        deleteUser: async (id: string) => (id === userStub.id ? id : null),
        };

        // 🧪 Inyección del fake en el servicio
        service = new UsersService(fakeRepo as UsersRepository);
    });

    it('getUsers() debe retornar un array de usuarios', async () => {
        const users = await service.getUsers();
        expect(users).toHaveLength(1);
        expect(users[0].email).toBe(userStub.email);
    });

    it('getUserById() debe retornar el usuario si existe', async () => {
        const user = await service.getUserById('uuid-123');
        expect(user).toBeDefined();
        expect(user?.name).toBe('Juan Pérez');
    });

    it('getUserById() debe retornar null si el usuario no existe', async () => {
        const user = await service.getUserById('otro-id');
        expect(user).toBeNull();
    });

    it('createUser() debe retornar el id y email del nuevo usuario', async () => {
        const dto: CreateUserDto = {
            name: 'Juan Pérez',
            email: 'juan@example.com',
            password: 'Password123!',
            address: 'Calle Falsa 123',
            phone: '099123456',
            country: 'Uruguay',
            city: 'Montevideo',
        };
        const created = await service.createUser(dto);
        expect(created).toEqual({ id: 'uuid-123', email: 'juan@example.com' });
    });

    it('updateUser() debe retornar el id si existe', async () => {
        const result = await service.updateUser('uuid-123', { name: 'Pedro' });
        expect(result).toBe('uuid-123');
    });

    it('updateUser() debe retornar null si no existe', async () => {
        const result = await service.updateUser('otro-id', { name: 'Pedro' });
        expect(result).toBeNull();
    });

    it('deleteUser() debe retornar el id si se elimina', async () => {
        const result = await service.deleteUser('uuid-123');
        expect(result).toBe('uuid-123');
    });

    it('deleteUser() debe retornar null si no existe', async () => {
        const result = await service.deleteUser('otro-id');
        expect(result).toBeNull();
    });
});
