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
exports.transferTransactionService = void 0;
const data_source_1 = __importDefault(require("../../data-source"));
const transactionCategories_entity_1 = __importDefault(require("../../entities/transactionCategories.entity"));
const transactions_entity_1 = __importDefault(require("../../entities/transactions.entity"));
const users_entity_1 = __importDefault(require("../../entities/users.entity"));
const wallets_entity_1 = __importDefault(require("../../entities/wallets.entity"));
const AppError_1 = require("../../errors/AppError");
const convertToPdfAndSend_1 = __importDefault(require("../../utils/emailManager/convertToPdfAndSend"));
const transactionRepository = data_source_1.default.getRepository(transactions_entity_1.default);
const walletRepository = data_source_1.default.getRepository(wallets_entity_1.default);
const userRepository = data_source_1.default.getRepository(users_entity_1.default);
const categoryRepository = data_source_1.default.getRepository(transactionCategories_entity_1.default);
const transferTransactionService = ({ amount, receiverDocumentId, senderDocumentId }, senderId) => __awaiter(void 0, void 0, void 0, function* () {
    const sender = yield userRepository.findOneBy({
        documentId: senderId,
    });
    const receiver = yield userRepository.findOneBy({
        documentId: receiverDocumentId,
    });
    const senderWallet = yield walletRepository.findOneBy({
        id: sender === null || sender === void 0 ? void 0 : sender.wallet.id,
    });
    const transactionType = yield categoryRepository.findOneBy({ type: "tf" });
    if (amount < 1) {
        throw new AppError_1.AppError("Amount not allowed", 400);
    }
    if (!senderWallet || !sender || !receiver || !transactionType) {
        throw new AppError_1.AppError("Wallet or user not found", 404);
    }
    if (senderDocumentId !== sender.documentId) {
        throw new AppError_1.AppError("The wallet does not belong to this user", 403);
    }
    if (senderWallet.amount < amount) {
        throw new AppError_1.AppError("User does not have the money to perform the transaction", 403);
    }
    const date = new Date().toDateString();
    const hour = new Date().toLocaleTimeString();
    const transaction = {
        amount,
        categoryType: transactionType,
        receiverWallet: receiver.wallet,
        senderWallet: senderWallet,
    };
    let transfer = transactionRepository.create(Object.assign(Object.assign({}, transaction), { date: date, hour: hour }));
    transfer = yield transactionRepository.save(transfer);
    senderWallet.amount = +senderWallet.amount - amount;
    receiver.wallet.amount = +receiver.wallet.amount + amount;
    yield walletRepository.update({
        id: senderWallet.id,
    }, senderWallet);
    yield walletRepository.update({
        id: receiver.wallet.id,
    }, receiver.wallet);
    const receiptData = Object.assign(Object.assign({}, transfer), { amount: transfer.amount.toFixed(2), sender: {
            name: sender.name,
        }, receiver: {
            name: receiver.name,
        } });
    yield (0, convertToPdfAndSend_1.default)("transfer", receiptData, sender.email, sender.name);
    return transfer;
});
exports.transferTransactionService = transferTransactionService;
