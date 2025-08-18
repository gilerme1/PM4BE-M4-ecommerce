/* eslint-disable prettier/prettier */
import { DataSource, DataSourceOptions } from "typeorm";
import { config as dotenvconfig } from "dotenv";
import { registerAs } from "@nestjs/config";

// Detectar entorno y cargar el .env correcto
const envFilePath =
  process.env.NODE_ENV === "production"
    ? "./.env.production"
    : process.env.NODE_ENV === "docker"
    ? "./.env.docker"
    : "./.env.development";

dotenvconfig({ path: envFilePath });

const config = {
    type: 'postgres',
    host: process.env.DB_HOST, 
    port: process.env.DB_PORT as unknown as number,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true, // carga automáticamente las entidades declaradas en los módulos
    // synchronize: true,     // desactivado para evitar perder datos en producción
    // synchronize: process.env.NODE_ENV !== 'production', // 👈 solo true en Render
    synchronize: false,
    logging: true,

    // Importante para que las migraciones y entidades funcionen desde dist/
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}']
};

// Exportamos esta configuración para usarla en NestJS
export default registerAs('typeorm', () => config);

// Y también para los comandos de migración
export const connectionSource = new DataSource(config as DataSourceOptions);

