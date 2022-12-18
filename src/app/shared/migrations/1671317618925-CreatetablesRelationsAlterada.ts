import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatetablesRelationsAlterada1671317618925 implements MigrationInterface {
    name = 'CreatetablesRelationsAlterada1671317618925'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trabalho_final"."tasks" DROP COLUMN "id_user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trabalho_final"."tasks" ADD "id_user" character varying NOT NULL`);
    }

}
