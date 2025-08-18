🛒 E-commerce API – NestJS
<p align="center"> <a href="http://nestjs.com/" target="blank"> <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /> </a> </p>
📌 Descripción

API backend desarrollada con NestJS + TypeScript para un sistema de e-commerce.
Incluye gestión de usuarios, productos, categorías, órdenes y archivos, con autenticación mediante JWT y control de acceso basado en roles.

🚀 Tecnologías usadas

Frameworks principales:
- NestJS – Framework backend para Node.js escrito en TypeScript
- TypeORM – ORM para PostgreSQL 
---

Base de datos:
- PostgreSQL
---

Librerías:
- class-validator / class-transformer – validación y transformación de DTOs
- bcrypt – encriptación de contraseñas
- JWT – autenticación
- Multer – subida de archivos
- Cloudinary SDK (opcional) – almacenamiento en la nube
---

Documentación:
- Swagger / OpenAPI – documentación interactiva de endpoints y modelos
---

⚙️ Pasos para correr el proyecto
# 1. Clonar repositorio
git clone https://github.com/usuario/proyecto-ecommerce.git
cd proyecto-ecommerce

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
NODE_ENV=development

- # DB local
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=gilerme
DB_NAME=ecommerce

APP_PORT=3000
JWT_SECRET=unaclavesecreta

- # Cloudinary 
CLOUDINARY_CLOUD_NAME=dybqj4fam
CLOUDINARY_API_SECRET=CkZne9A370Pm8RXrLMuucHzo5pQ
CLOUDINARY_API_KEY=117976955152918

# Editar valores (DB_HOST, DB_USER, DB_PASS, JWT_SECRET, etc.)

# 4. Ejecutar migraciones
- npm run build
- npm run typeorm migration:generate ./src/migrations/nombreArchivo -d ./src/config/typeorm.ts
----
- npm run build
- npm run typeorm migration:run -- -d ./src/config/typeorm.ts
---
- npm run typeorm migration:revert -- -d ./src/config/typeorm.ts

# 5. Ejecutar la precarga de datos (seeders)
Incluye un sistema de precarga de datos (seeders) para garantizar que siempre haya productos y categorías iniciales sin riesgo de duplicados.

✅ Cómo evita duplicados:
- Antes de insertar se verifica si la categoría o producto ya existe.
- Mantiene relaciones consistentes entre productos y categorías.

# 6. Iniciar proyecto en modo desarrollo
npm run start:dev

📖 Documentación API (Swagger)

Cuando el servidor está corriendo, podés ver la documentación en:
👉 http://localhost:3000/api

Ejemplo de uso de OpenAPI en un endpoint:

@ApiTags('Users')
@Controller('users')
export class UsersController {
  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios' })
    findAll() {
      return this.usersService.getUsers();
    }
}

📂 Endpoints principales
🔑 Auth

- POST /auth/signup → Registro de usuario
- POST /auth/signin → Login y generación de JWT

👤 Users

- GET /users → Listar usuarios (requiere JWT para autenticacion y rol para autorización) 
- GET /users/:id → Obtener usuario por ID
- PUT /users/:id → Actualizar usuario
- DELETE /users/:id → Eliminar usuario

📦 Products

- GET /products → Listar productos
- GET /products/:id → Obtener producto por ID
- PUT /products/:id → Editar producto

🗂️ Categories
- GET /categories → Listar categorías

🛍️ Orders
- POST /orders → Crear orden de compra
- GET /orders/:id → Detalle de orden

📁 Files
- POST /files/upload → Subir archivo

📌 Ejemplo Request / Response
POST /auth/signin
Request:
{
  "email": "user@example.com",
  "password": "123456"
}

Response:
  {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp.....",
    "user": {
      "id": "838c4a84-84dc-4e56-8e9e-17be5bd1f7be",
      "email": "user@example.com"
    }
  }

GET /users (requiere JWT)
- Headers

Authorization: Bearer <token>
Response
[
  {
    "id": "7a5b0f80-9f2a-4a2e-82b5-3af775ce6871",
    "name": "Monicalo Pose",
    "email": "marto@example.com",
    "phone": "+59891234568",
    "country": "Uruguay",
    "address": "Calle Falsa 1223",
    "city": "Montevideo"
  }
]

✅ Tests
# Unit tests
npm run test

# e2e tests
npm run test:e2e

