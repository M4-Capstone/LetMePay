import { MigrationInterface, QueryRunner } from "typeorm";

export class fixingrelations1662738351405 implements MigrationInterface {
    name = 'fixingrelations1662738351405'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_2c447a66ba88affc54d03f541b2"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_4d3780cb30b7e2f7949689e3b56"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_3f062ad5434ca2ce2a1fc4e9494"`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "categoryTypeId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "receiverWalletId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "REL_4d3780cb30b7e2f7949689e3b5"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "REL_3f062ad5434ca2ce2a1fc4e949"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_2c447a66ba88affc54d03f541b2" FOREIGN KEY ("categoryTypeId") REFERENCES "transaction_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_4d3780cb30b7e2f7949689e3b56" FOREIGN KEY ("receiverWalletId") REFERENCES "wallets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_3f062ad5434ca2ce2a1fc4e9494" FOREIGN KEY ("senderWalletId") REFERENCES "wallets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_3f062ad5434ca2ce2a1fc4e9494"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_4d3780cb30b7e2f7949689e3b56"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_2c447a66ba88affc54d03f541b2"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "REL_3f062ad5434ca2ce2a1fc4e949" UNIQUE ("senderWalletId")`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "REL_4d3780cb30b7e2f7949689e3b5" UNIQUE ("receiverWalletId")`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "receiverWalletId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "categoryTypeId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_3f062ad5434ca2ce2a1fc4e9494" FOREIGN KEY ("senderWalletId") REFERENCES "wallets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_4d3780cb30b7e2f7949689e3b56" FOREIGN KEY ("receiverWalletId") REFERENCES "wallets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_2c447a66ba88affc54d03f541b2" FOREIGN KEY ("categoryTypeId") REFERENCES "transaction_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
