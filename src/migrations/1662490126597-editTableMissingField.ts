import { MigrationInterface, QueryRunner } from "typeorm";

export class editTableMissingField1662490126597 implements MigrationInterface {
    name = 'editTableMissingField1662490126597'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ADD "street" character varying(60) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "street"`);
    }

}
