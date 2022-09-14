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
exports.fixingrelationsCategory1662739313597 = void 0;
class fixingrelationsCategory1662739313597 {
    constructor() {
        this.name = 'fixingrelationsCategory1662739313597';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_2c447a66ba88affc54d03f541b2"`);
            yield queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "REL_2c447a66ba88affc54d03f541b"`);
            yield queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_2c447a66ba88affc54d03f541b2" FOREIGN KEY ("categoryTypeId") REFERENCES "transaction_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_2c447a66ba88affc54d03f541b2"`);
            yield queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "REL_2c447a66ba88affc54d03f541b" UNIQUE ("categoryTypeId")`);
            yield queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_2c447a66ba88affc54d03f541b2" FOREIGN KEY ("categoryTypeId") REFERENCES "transaction_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.fixingrelationsCategory1662739313597 = fixingrelationsCategory1662739313597;
