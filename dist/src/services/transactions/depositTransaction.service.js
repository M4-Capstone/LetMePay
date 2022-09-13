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
exports.depositTransactionService = void 0;
const data_source_1 = __importDefault(require("../../data-source"));
const transactionCategories_entity_1 = __importDefault(require("../../entities/transactionCategories.entity"));
const transactions_entity_1 = __importDefault(require("../../entities/transactions.entity"));
const users_entity_1 = __importDefault(require("../../entities/users.entity"));
const wallets_entity_1 = __importDefault(require("../../entities/wallets.entity"));
const AppError_1 = require("../../errors/AppError");
const transactionRepository = data_source_1.default.getRepository(transactions_entity_1.default);
const walletRepository = data_source_1.default.getRepository(wallets_entity_1.default);
const userRepository = data_source_1.default.getRepository(users_entity_1.default);
const categoryRepository = data_source_1.default.getRepository(transactionCategories_entity_1.default);
const depositTransactionService = ({ amount, receiverWalletId, documentId, }) => __awaiter(void 0, void 0, void 0, function* () {
    const receiver = yield walletRepository.findOneBy({ id: receiverWalletId });
    const user = yield userRepository.findOneBy({ documentId });
    const transactionType = yield categoryRepository.findOneBy({ type: "dp" });
    if (!user || !receiver || !transactionType) {
        throw new AppError_1.AppError("Wallet or user not found", 404);
    }
    if (user.wallet.id !== receiver.id) {
        throw new AppError_1.AppError("The wallet does not belong to this user", 403);
    }
    if (amount < 1) {
        throw new AppError_1.AppError("Amount not allowed", 400);
    }
    const date = new Date().toDateString();
    const hour = new Date().toLocaleTimeString();
    const transaction = {
        amount,
        categoryType: transactionType,
        receiverWallet: receiver,
    };
    let deposit = transactionRepository.create(Object.assign(Object.assign({}, transaction), { date: date, hour: hour }));
    deposit = yield transactionRepository.save(deposit);
    receiver.amount = +receiver.amount + amount;
    yield walletRepository.update({
        id: receiver.id,
    }, receiver);
    //   await sendReceiptToClientEmail('deposit',_,_)
    //   import sendReceiptToClientEmail from '../../utils/emailManager/convertToPdfAndSend'
    return deposit;
});
exports.depositTransactionService = depositTransactionService;
