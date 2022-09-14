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
exports.fixWalletField1662643171280 = void 0;
class fixWalletField1662643171280 {
    constructor() {
        this.name = 'fixWalletField1662643171280';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "wallets" DROP CONSTRAINT "FK_e7aac2dbe5f51f5dd934d7298d5"`);
            yield queryRunner.query(`ALTER TABLE "wallets" DROP CONSTRAINT "REL_e7aac2dbe5f51f5dd934d7298d"`);
            yield queryRunner.query(`ALTER TABLE "wallets" DROP COLUMN "ownerDocumentId"`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "wallets" ADD "ownerDocumentId" character varying(14)`);
            yield queryRunner.query(`ALTER TABLE "wallets" ADD CONSTRAINT "REL_e7aac2dbe5f51f5dd934d7298d" UNIQUE ("ownerDocumentId")`);
            yield queryRunner.query(`ALTER TABLE "wallets" ADD CONSTRAINT "FK_e7aac2dbe5f51f5dd934d7298d5" FOREIGN KEY ("ownerDocumentId") REFERENCES "users"("documentId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.fixWalletField1662643171280 = fixWalletField1662643171280;
