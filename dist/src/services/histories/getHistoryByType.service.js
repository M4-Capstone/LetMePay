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
const typeorm_1 = require("typeorm");
const data_source_1 = __importDefault(require("../../data-source"));
const transactions_entity_1 = __importDefault(require("../../entities/transactions.entity"));
const users_entity_1 = __importDefault(require("../../entities/users.entity"));
const AppError_1 = require("../../errors/AppError");
const DateUtils_1 = __importDefault(require("../../utils/DateUtils"));
const getHistoryByTypeService = (id, type, { period, startDate, endDate }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const historyRepo = data_source_1.default.getRepository(transactions_entity_1.default);
    const userRepo = data_source_1.default.getRepository(users_entity_1.default);
    const userWallet = (_a = (yield userRepo.findOneBy({ documentId: id }))) === null || _a === void 0 ? void 0 : _a.wallet;
    if (!userWallet)
        throw new AppError_1.AppError("Wallet not found", 500);
    if (period) {
        const date = DateUtils_1.default.periodToDateString(period);
        const history = yield historyRepo.find({
            where: [
                {
                    date: (0, typeorm_1.MoreThanOrEqual)(date),
                    senderWallet: {
                        id: userWallet.id,
                    },
                    categoryType: {
                        type,
                    },
                },
                {
                    date: (0, typeorm_1.MoreThanOrEqual)(date),
                    receiverWallet: {
                        id: userWallet.id,
                    },
                    categoryType: {
                        type,
                    },
                },
            ],
            relations: {
                senderWallet: true,
                receiverWallet: true,
            },
        });
        return history;
    }
    else if (startDate || endDate) {
        let comparison;
        if (startDate && endDate)
            comparison = (0, typeorm_1.MoreThanOrEqual)(startDate) && (0, typeorm_1.LessThanOrEqual)(endDate);
        else if (startDate)
            comparison = (0, typeorm_1.MoreThanOrEqual)(startDate);
        else if (endDate)
            comparison = (0, typeorm_1.LessThanOrEqual)(endDate);
        const history = yield historyRepo.find({
            where: [
                {
                    date: comparison,
                    senderWallet: {
                        id: userWallet.id,
                    },
                    categoryType: {
                        type,
                    },
                },
                {
                    date: comparison,
                    receiverWallet: {
                        id: userWallet.id,
                    },
                    categoryType: {
                        type,
                    },
                },
            ],
            relations: {
                senderWallet: true,
                receiverWallet: true,
            },
        });
        return history;
    }
    return yield historyRepo.find({
        where: [
            {
                receiverWallet: {
                    id: userWallet.id,
                },
                categoryType: {
                    type,
                },
            },
            {
                senderWallet: {
                    id: userWallet.id,
                },
                categoryType: {
                    type,
                },
            },
        ],
        relations: {
            senderWallet: true,
            receiverWallet: true,
        },
    });
});
exports.default = getHistoryByTypeService;
