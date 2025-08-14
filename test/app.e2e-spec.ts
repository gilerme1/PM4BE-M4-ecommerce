/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Pruebas users/auth (e2e) - pruebas de integración de 5 rutas distintas', () => {
  let app: INestApplication;
  let token: string;
  let createdUserId: string;
  let emailPrueba: string;

  // Datos base para crear usuarios de prueba
  const usuariosPrueba = {
    name: 'Juan Test',
    password: 'Test123!',
    confirmPassword: 'Test123!',
    address: 'Calle 123',
    phone: '099123456',
    country: 'Uruguay',
    city: 'Montevideo',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication(); // Crea la app
    app.useGlobalPipes(new ValidationPipe({ whitelist: true })); // Aplica validación global
    await app.init(); // Inicializa la app
  });

  // Se ejecuta una vez después de todas las pruebas. Cierra la aplicación.
  afterAll(async () => {
    await app.close();
  });

  // Se ejecuta antes de cada prueba. Crea un usuario y obtiene un token de autenticación.
  beforeEach(async () => {
    emailPrueba = `juan.test+${Date.now()}@example.com`;
    const signupData = { ...usuariosPrueba, email: emailPrueba };

    // Registra un nuevo usuario y espera un 201 (Created)
    const signupResponse = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(signupData)
      .expect(201);

    createdUserId = signupResponse.body.id;  // Guarda el ID del usuario creado

    // Inicia sesión con el usuario creado y espera un 201 (Created)
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({ email: emailPrueba, password: usuariosPrueba.password })
      .expect(201);

    token = loginResponse.body.access_token;  // Guarda el token de acceso
  });

   //Cada test crea su propio usuario con beforeEach(), afterEach() se asegura de eliminar ese usuario
  afterEach(async () => {
    if (createdUserId) {
      await request(app.getHttpServer())
        .delete(`/users/${createdUserId}`)
        .set('Authorization', `Bearer ${token}`)
        // Aquí aceptamos 200 (existe y borró) o 404 (ya borrado)
        .expect(res => {
          if (res.status !== 200 && res.status !== 404) {
            throw new Error(`Error inesperado eliminando usuario: status ${res.status}`);
          }
        });
    }
  });


  it('✅ POST /auth/signup - crea un usuario nuevo', async () => {
    const email = `nuevo.usuario+${Date.now()}@example.com`; // Email para el nuevo usuario
    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ ...usuariosPrueba, email })
      .expect(201); // Espera 201 (Created)

    expect(response.body).toHaveProperty('id'); // Verifica que la respuesta tenga un ID
    expect(response.body.email).toBe(email); // Verifica que el email coincida
  });

  it('✅ POST /auth/signin - falla si el usuario no existe', async () => {
    // Intenta iniciar sesión con un email inexistente
    await request(app.getHttpServer())
      .post('/auth/signin')
      .send({ email: `email.inexistente+${Date.now()}@example.com`, password: usuariosPrueba.password })
      .expect(400); // Espera 400 (Bad Request)
  });

  it('✅ GET /users/:id - obtiene usuario existente', async () => {
    const res = await request(app.getHttpServer())
      .get(`/users/${createdUserId}`) // Petición GET al usuario por ID
      .set('Authorization', `Bearer ${token}`) // Incluye el token de autorización
      .expect(200); // Espera 200 (OK)

    expect(res.body).toHaveProperty('id', createdUserId); // Verifica el ID del usuario
    expect(res.body).toHaveProperty('email', emailPrueba); // Verifica el email del usuario
  });

  it('✅ PUT/users/:id - actualiza usuario', async () => {
    const newName = 'Juan Actualizado'; // Nuevo nombre para actualizar
    const res = await request(app.getHttpServer())
      .put(`/users/${createdUserId}`) // Petición PUT para actualizar
      .set('Authorization', `Bearer ${token}`) // Incluye el token de autorización
      .send({ name: newName }) // Envía los datos a actualizar
      .expect(200); // Espera 200 (OK)

    expect(res.body).toHaveProperty('id', createdUserId); // Verifica que el ID se mantenga
  });

  it('✅ DELETE /users/:id - elimina un usuario existente', async () => {
    // Intenta eliminar el usuario creado en beforeEach
    await request(app.getHttpServer())
      .delete(`/users/${createdUserId}`) // Petición DELETE para eliminar
      .set('Authorization', `Bearer ${token}`) // Incluye el token de autorización
      .expect(200); // Espera 200 (OK) por la eliminación

    // Intenta obtener el usuario eliminado para verificar que ya no existe
    await request(app.getHttpServer())
      .get(`/users/${createdUserId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404); // Espera 404 (Not Found)
  });
});


