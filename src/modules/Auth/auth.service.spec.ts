/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException, ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../Auth/auth.service';
import { UsersRepository } from '../Users/users.repository';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';
import { SignupUserDto } from '../Users/signupUserDto';


describe('AuthService - test de funcionalidades del servicio de autenticación', () => {
    let authService: AuthService;

    const mockUserDto: SignupUserDto = {   // Definimos un DTO de usuario simulado para usar en las pruebas.
      name: 'Guillermo',
      email: 'guillermo@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!',
      phone: '099123456',
      address: 'Calle Falsa 123',
      city: 'Montevideo',
      country: 'Uruguay',
    };

    // Variable que simulará un usuario en la "base de datos" del mock.
    // Su valor se modificará en cada test para simular diferentes escenarios (usuario encontrado/no encontrado).
    let dbUserMock: any = null;

    // Implementaciones de los mocks para UsersRepository.
    const usersRepoMock = {
      // Simula la obtención de un usuario por email. Devuelve el valor actual de `dbUserMock`.
      getUsersByEmail: (email: string) => Promise.resolve(dbUserMock),
      // Simula la creación de un usuario. Devuelve un objeto con los datos del usuario y un ID fijo.
      createUser: (user) =>
        Promise.resolve({
          ...user,
          id: 'user-123', // ID simulado para el usuario creado
        }),
    };
    
    // Simula la firma de un token JWT. Siempre devuelve un token falso predefinido.
    const jwtServiceMock = {
      sign: (payload) => {
        return 'token-falso';
      },
    };

    beforeEach(async () => {
      dbUserMock = null; // Reset en cada test

      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AuthService,    // El servicio que estamos probando.
          { provide: UsersRepository, useValue: usersRepoMock },  // los mocks manuales para las dependencias.
          { provide: JwtService, useValue: jwtServiceMock },
        ],
      }).compile();

      authService = module.get<AuthService>(AuthService);
    });

    it('Crear una instancia de AuthService', async () => {
      expect(authService).toBeDefined();
    });

    it('signUp() creates a new user with an encrypted password', async () => {
      let passwordGuardadaEnRepo = '';
      // Reescribimos el método manualmente para interceptar la contraseña
      usersRepoMock.createUser = (user) => {
        passwordGuardadaEnRepo = user.password;
        return Promise.resolve({
          ...user,
          id: 'user-123',
        });
      };
      await authService.signUp(mockUserDto);
      // Verificamos que la contraseña guardada sea un hash válido
      const passwordIsHashed = await bcrypt.compare(mockUserDto.password, passwordGuardadaEnRepo);
      expect(passwordIsHashed).toBe(true);
    });

    it('signUp() tira un error si email ya está en uso', async () => {
      // Configura `dbUserMock` para simular que un usuario ya existe con ese email.
      dbUserMock = { id: 'existing-user', email: mockUserDto.email, password: 'hashedpassword' };

       // Espera que la llamada a signUp lance un error con una BadRequestException específica.
      await expect(authService.signUp(mockUserDto)).rejects.toThrow(
        new BadRequestException('El email ya está registrado'),
      );
    });

    it('signUp() tira un error si el password no coincide', async () => {
      // Crea un DTO con contraseñas que no coinciden.
      const invalidDto = { ...mockUserDto, confirmPassword: 'otra' };

      await expect(authService.signUp(invalidDto)).rejects.toThrow(
        new BadRequestException('Las contraseñas no coinciden'),
      );
    });

    it('signIn() tira un error si el usuario no se encuentra', async () => {
      dbUserMock = null;
        try {
        await authService.signIn(mockUserDto.email, mockUserDto.password);
        } catch (error) {
        expect(error.message). toEqual('Usuario no encontrado');
        }
    });

    it('signIn() tira un error si password es invalido', async () => {
      // Simula un usuario existente con una contraseña hasheada diferente a la del mockUserDto.
      const hashedPassword = await bcrypt.hash('otraPassword', 10);
      dbUserMock = {
        ...mockUserDto,
        id: 'user-123',
        password: hashedPassword,
        role: 'user',
      };

      await expect(authService.signIn(mockUserDto.email, mockUserDto.password)).rejects.toThrow(
        new BadRequestException('Credenciales(email/password) inválidas'),
      );
    });

    it('signIn() retorna el access_token y usuario si las credenciales son validas', async () => {
      const hashedPassword = await bcrypt.hash(mockUserDto.password, 10);
      dbUserMock = {
        ...mockUserDto,
        id: 'user-123',
        password: hashedPassword,
        role: 'admin',  // Simula un rol para el usuario
      };

      const result = await authService.signIn(mockUserDto.email, mockUserDto.password);

      expect(result).toEqual({
        access_token: 'token-falso', // El token simulado de jwtServiceMock
        user: {
          id: 'user-123',
          email: mockUserDto.email,
        },
      });
    });
  });