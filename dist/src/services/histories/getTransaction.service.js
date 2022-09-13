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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../../data-source"));
const transactions_entity_1 = __importDefault(require("../../entities/transactions.entity"));
const AppError_1 = require("../../errors/AppError");
const getTransactionService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const historyRepo = data_source_1.default.getRepository(transactions_entity_1.default);
    const transaction = yield historyRepo.findOne({
        where: { id },
        relations: { receiverWallet: true, senderWallet: true },
    });
    if (!transaction)
        throw new AppError_1.AppError("There is no transaction made with this id", 404);
    return transaction;
});
exports.default = getTransactionService;
