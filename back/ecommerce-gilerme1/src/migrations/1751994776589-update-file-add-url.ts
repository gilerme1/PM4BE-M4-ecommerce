/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFileAddUrl1751994776589 implements MigrationInterface {
    name = 'UpdateFileAddUrl1751994776589'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Eliminar la columna antigua 'data'
        await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "data"`);

        // 2. Agregar nueva columna 'url' como nullable
        await queryRunner.query(`ALTER TABLE "files" ADD "url" character varying`);

        // 3. (opcional) Llenar los valores existentes con un placeholder si había registros
        await queryRunner.query(`UPDATE "files" SET "url" = 'https://placeholder.com/image.jpg' WHERE "url" IS NULL`);

        // 4. Hacerla NOT NULL después de asegurar que todas las filas tengan valor
        await queryRunner.query(`ALTER TABLE "files" ALTER COLUMN "url" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 1. Eliminar la nueva columna 'url'
        await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "url"`);

        // 2. Volver a crear 'data' como tipo bytea NOT NULL
        await queryRunner.query(`ALTER TABLE "files" ADD "data" bytea NOT NULL`);
    }
}