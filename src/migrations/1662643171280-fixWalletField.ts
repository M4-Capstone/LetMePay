import { MigrationInterface, QueryRunner } from "typeorm";

export class fixWalletField1662643171280 implements MigrationInterface {
    name = 'fixWalletField1662643171280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallets" DROP CONSTRAINT "FK_e7aac2dbe5f51f5dd934d7298d5"`);
        await queryRunner.query(`ALTER TABLE "wallets" DROP CONSTRAINT "REL_e7aac2dbe5f51f5dd934d7298d"`);
        await queryRunner.query(`ALTER TABLE "wallets" DROP COLUMN "ownerDocumentId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallets" ADD "ownerDocumentId" character varying(14)`);
        await queryRunner.query(`ALTER TABLE "wallets" ADD CONSTRAINT "REL_e7aac2dbe5f51f5dd934d7298d" UNIQUE ("ownerDocumentId")`);
        await queryRunner.query(`ALTER TABLE "wallets" ADD CONSTRAINT "FK_e7aac2dbe5f51f5dd934d7298d5" FOREIGN KEY ("ownerDocumentId") REFERENCES "users"("documentId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
