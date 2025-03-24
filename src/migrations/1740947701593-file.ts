import { MigrationInterface, QueryRunner } from "typeorm";

export class File1740947701593 implements MigrationInterface {
  name = "File1740947701593";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "files" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "mimeType" character varying NOT NULL, "data" bytea NOT NULL, "todoId" integer, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "files" ADD CONSTRAINT "FK_3e4bcbd8fe38213cae99b763522" FOREIGN KEY ("todoId") REFERENCES "todos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "files" DROP CONSTRAINT "FK_3e4bcbd8fe38213cae99b763522"`,
    );
    await queryRunner.query(`DROP TABLE "files"`);
  }
}
