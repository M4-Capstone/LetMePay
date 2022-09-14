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
exports.fixing1663120889314 = void 0;
class fixing1663120889314 {
    constructor() {
        this.name = 'fixing1663120889314';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "transaction" ADD "receiverIdDocumentId" character varying(14)`);
            yield queryRunner.query(`ALTER TABLE "transaction" ADD "senderIdDocumentId" character varying(14)`);
            yield queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_442bdd192a6f85042eaf4f34bf4" FOREIGN KEY ("receiverIdDocumentId") REFERENCES "users"("documentId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_274cd081e46d2906518c8e61551" FOREIGN KEY ("senderIdDocumentId") REFERENCES "users"("documentId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_274cd081e46d2906518c8e61551"`);
            yield queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_442bdd192a6f85042eaf4f34bf4"`);
            yield queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "senderIdDocumentId"`);
            yield queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "receiverIdDocumentId"`);
        });
    }
}
exports.fixing1663120889314 = fixing1663120889314;
