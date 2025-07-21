/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './createUser.dto';
import { Role } from '../../roles/roles.enum';

// 🧪 Usuario simulado
const usuarioPrueba = {
    id: 'uuid-123',
    name: 'Juan Pérez',
    email: 'juan@example.com',
    password: 'Password123!',       // Nota: En un entorno real, las contraseñas estarían hasheadas.
    address: 'Calle Falsa 123',
    phone: '099123456',
    country: 'Uruguay',
    city: 'Montevideo',
    role: Role.USER, // 👈 debe coincidir con tu enum
    orders: [], // Asume que un usuario puede tener órdenes, aunque no se usen en estas pruebas.
};

describe('UsersService - test de funcionalidades del servicio de usuarios', () => {
    let service: UsersService;
    let repoPrueba: Partial<UsersRepository>;  // permite implementar solo los métodos necesarios para las pruebas.

    beforeEach(() => {
         // Cada método simula el comportamiento esperado del repositorio de forma simplificada.
        repoPrueba = {
        getUsers: async () => [{ ...usuarioPrueba }],
        getById: async (id: string) => (id === usuarioPrueba .id ? { ...usuarioPrueba    } : null),
        createUser: async (dto: CreateUserDto) => ({ id: 'uuid-123', email: dto.email }),
        updateUser: async (id: string, dto: Partial<CreateUserDto>) => (id === usuarioPrueba .id ? id : null),
        deleteUser: async (id: string) => (id === usuarioPrueba  .id ? id : null),
        };

        // 🧪 Inyección del repo de prueba en el servicio
        service = new UsersService(repoPrueba as UsersRepository);
    });

    it('getUsers() debe retornar un array de usuarios', async () => {
        const users = await service.getUsers();
        expect(users).toHaveLength(1);
        expect(users[0].email).toBe(usuarioPrueba.email);
    });

    it('getUserById() debe retornar el usuario si existe', async () => {
        const user = await service.getUserById('uuid-123'); // Llama al método con un ID existente.
        expect(user).toBeDefined(); // Espera que el usuario no sea undefined o null.
        expect(user?.name).toBe('Juan Pérez');
    });

    it('getUserById() debe retornar null si el usuario no existe', async () => {
        const user = await service.getUserById('otro-id'); // Llama al método con un ID no existente.
        expect(user).toBeNull();
    });

    it('createUser() debe retornar el id y email del nuevo usuario', async () => {
        // Define un DTO de ejemplo para la creación de un usuario.
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
        expect(created).toEqual({ id: 'uuid-123', email: 'juan@example.com' });  // Espera que el resultado coincida con el mock.
    });

    it('updateUser() debe retornar el id si existe', async () => {
        const result = await service.updateUser('uuid-123', { name: 'Pedro' }); // Llama al método con un ID existente.
        expect(result).toBe('uuid-123');  // Espera que el ID retornado sea el del usuario actualizado.
    });

    it('updateUser() debe retornar null si no existe', async () => {
        const result = await service.updateUser('otro-id', { name: 'Pedro' }); // Llama al método con un ID inexistente.
        expect(result).toBeNull();
    });

    it('deleteUser() debe retornar el id si se elimina', async () => {
        const result = await service.deleteUser('uuid-123');
        expect(result).toBe('uuid-123');  // Espera que el ID retornado sea el del usuario eliminado.
    });

    it('deleteUser() debe retornar null si no existe', async () => {
        const result = await service.deleteUser('otro-id');  // Llama al método con un ID inexistente.
        expect(result).toBeNull();
    });
});
