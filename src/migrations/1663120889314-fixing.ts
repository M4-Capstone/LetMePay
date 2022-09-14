import { MigrationInterface, QueryRunner } from "typeorm";

export class fixing1663120889314 implements MigrationInterface {
    name = 'fixing1663120889314'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" ADD "receiverIdDocumentId" character varying(14)`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "senderIdDocumentId" character varying(14)`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_442bdd192a6f85042eaf4f34bf4" FOREIGN KEY ("receiverIdDocumentId") REFERENCES "users"("documentId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_274cd081e46d2906518c8e61551" FOREIGN KEY ("senderIdDocumentId") REFERENCES "users"("documentId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_274cd081e46d2906518c8e61551"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_442bdd192a6f85042eaf4f34bf4"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "senderIdDocumentId"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "receiverIdDocumentId"`);
    }

}
