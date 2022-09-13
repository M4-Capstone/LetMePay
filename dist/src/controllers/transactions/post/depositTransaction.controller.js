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
exports.depositTransactionController = void 0;
const depositTransaction_service_1 = require("../../../services/transactions/depositTransaction.service");
const depositTransactionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, receiverWalletId, documentId } = req.body;
    console.log(req.body, 'iassa');
    yield (0, depositTransaction_service_1.depositTransactionService)({
        amount,
        receiverWalletId,
        documentId,
    });
    return res.json({
        message: 'Transaction successfully created',
        status: 'Receipt sent to customers email',
    });
});
exports.depositTransactionController = depositTransactionController;
