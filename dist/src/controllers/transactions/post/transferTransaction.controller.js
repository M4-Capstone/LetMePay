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
exports.transferTransactionController = void 0;
const transferTransaction_service_1 = require("../../../services/transactions/transferTransaction.service");
const transferTransactionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, receiverDocumentId, senderDocumentId } = req.body;
    const senderId = req.user.id;
    yield (0, transferTransaction_service_1.transferTransactionService)({
        amount,
        receiverDocumentId,
        senderDocumentId,
    }, senderId);
    return res.json({
        message: "Transfer transaction successfully created",
        status: "Receipt sent to customers email",
    });
});
exports.transferTransactionController = transferTransactionController;
