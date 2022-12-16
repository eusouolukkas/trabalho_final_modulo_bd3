import { MigrationInterface, QueryRunner } from "typeorm";

export class Createtables1671215405912 implements MigrationInterface {
    name = 'Createtables1671215405912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "trabalho_final"."user" ("id" character varying NOT NULL, "name" character varying(60) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trabalho_final"."tasks" ("id" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "id_user" character varying NOT NULL, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "trabalho_final"."tasks" ADD CONSTRAINT "FK_44fe0c59b0e8f8077b1d9c27f75" FOREIGN KEY ("id_user") REFERENCES "trabalho_final"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trabalho_final"."tasks" DROP CONSTRAINT "FK_44fe0c59b0e8f8077b1d9c27f75"`);
        await queryRunner.query(`DROP TABLE "trabalho_final"."tasks"`);
        await queryRunner.query(`DROP TABLE "trabalho_final"."user"`);
    }

}
