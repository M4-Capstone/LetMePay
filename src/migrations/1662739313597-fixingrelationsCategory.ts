import { MigrationInterface, QueryRunner } from "typeorm";

export class fixingrelationsCategory1662739313597 implements MigrationInterface {
    name = 'fixingrelationsCategory1662739313597'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_2c447a66ba88affc54d03f541b2"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "REL_2c447a66ba88affc54d03f541b"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_2c447a66ba88affc54d03f541b2" FOREIGN KEY ("categoryTypeId") REFERENCES "transaction_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_2c447a66ba88affc54d03f541b2"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "REL_2c447a66ba88affc54d03f541b" UNIQUE ("categoryTypeId")`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_2c447a66ba88affc54d03f541b2" FOREIGN KEY ("categoryTypeId") REFERENCES "transaction_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
