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
exports.fixingrelations1662738351405 = void 0;
class fixingrelations1662738351405 {
    constructor() {
        this.name = 'fixingrelations1662738351405';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_2c447a66ba88affc54d03f541b2"`);
            yield queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_4d3780cb30b7e2f7949689e3b56"`);
            yield queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_3f062ad5434ca2ce2a1fc4e9494"`);
            yield queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "categoryTypeId" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "receiverWalletId" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "REL_4d3780cb30b7e2f7949689e3b5"`);
            yield queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "REL_3f062ad5434ca2ce2a1fc4e949"`);
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
            yield queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "REL_3f062ad5434ca2ce2a1fc4e949" UNIQUE ("senderWalletId")`);
            yield queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "REL_4d3780cb30b7e2f7949689e3b5" UNIQUE ("receiverWalletId")`);
            yield queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "receiverWalletId" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "categoryTypeId" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_3f062ad5434ca2ce2a1fc4e9494" FOREIGN KEY ("senderWalletId") REFERENCES "wallets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_4d3780cb30b7e2f7949689e3b56" FOREIGN KEY ("receiverWalletId") REFERENCES "wallets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_2c447a66ba88affc54d03f541b2" FOREIGN KEY ("categoryTypeId") REFERENCES "transaction_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.fixingrelations1662738351405 = fixingrelations1662738351405;
