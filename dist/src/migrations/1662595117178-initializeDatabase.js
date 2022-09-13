"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewMigration1662595117178 = void 0;
class NewMigration1662595117178 {
    constructor() {
        this.name = 'NewMigration1662595117178';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "neighbourhood" character varying(60) NOT NULL, "zipCode" character varying(8) NOT NULL, "street" character varying(60) NOT NULL, "number" character varying(6), "city" character varying(60) NOT NULL, "state" character varying(2) NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "wallets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" numeric(12,2) NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerDocumentId" character varying(14), CONSTRAINT "REL_e7aac2dbe5f51f5dd934d7298d" UNIQUE ("ownerDocumentId"), CONSTRAINT "PK_8402e5df5a30a229380e83e4f7e" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "users" ("documentId" character varying(14) NOT NULL, "name" character varying(100) NOT NULL, "email" character varying(70) NOT NULL, "password" character varying(160) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "addressId" uuid, "walletId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_bafb08f60d7857f4670c172a6e" UNIQUE ("addressId"), CONSTRAINT "REL_0a95e6aab86ff1b0278c18cf48" UNIQUE ("walletId"), CONSTRAINT "PK_5ba6f596bbf91749a8d898c1128" PRIMARY KEY ("documentId"))`);
            yield queryRunner.query(`CREATE TABLE "transaction_categories" ("id" SERIAL NOT NULL, "type" character varying(2) NOT NULL, CONSTRAINT "PK_bbd38b9174546b0ed4fe04689c7" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "transaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" numeric(12,2) NOT NULL, "date" date NOT NULL, "hour" TIME NOT NULL, "categoryTypeId" integer, "receiverWalletId" uuid, "senderWalletId" uuid, CONSTRAINT "REL_2c447a66ba88affc54d03f541b" UNIQUE ("categoryTypeId"), CONSTRAINT "REL_4d3780cb30b7e2f7949689e3b5" UNIQUE ("receiverWalletId"), CONSTRAINT "REL_3f062ad5434ca2ce2a1fc4e949" UNIQUE ("senderWalletId"), CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "wallets" ADD CONSTRAINT "FK_e7aac2dbe5f51f5dd934d7298d5" FOREIGN KEY ("ownerDocumentId") REFERENCES "users"("documentId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_0a95e6aab86ff1b0278c18cf48e" FOREIGN KEY ("walletId") REFERENCES "wallets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_2c447a66ba88affc54d03f541b2" FOREIGN KEY ("categoryTypeId") REFERENCES "transaction_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_4d3780cb30b7e2f7949689e3b56" FOREIGN KEY ("receiverWalletId") REFERENCES "wallets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_3f062ad5434ca2ce2a1fc4e9494" FOREIGN KEY ("senderWalletId") REFERENCES "wallets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_3f062ad5434ca2ce2a1fc4e9494"`);
            yield queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_4d3780cb30b7e2f7949689e3b56"`);
            yield queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_2c447a66ba88affc54d03f541b2"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_0a95e6aab86ff1b0278c18cf48e"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea"`);
            yield queryRunner.query(`ALTER TABLE "wallets" DROP CONSTRAINT "FK_e7aac2dbe5f51f5dd934d7298d5"`);
            yield queryRunner.query(`DROP TABLE "transaction"`);
            yield queryRunner.query(`DROP TABLE "transaction_categories"`);
            yield queryRunner.query(`DROP TABLE "users"`);
            yield queryRunner.query(`DROP TABLE "wallets"`);
            yield queryRunner.query(`DROP TABLE "addresses"`);
        });
    }
}
exports.NewMigration1662595117178 = NewMigration1662595117178;
