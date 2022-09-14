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
const getHistoryService = (id, { period, startDate, endDate }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const historyRepo = data_source_1.default.getRepository(transactions_entity_1.default);
    const userRepo = data_source_1.default.getRepository(users_entity_1.default);
    const userWallet = (_a = (yield userRepo.findOneBy({ documentId: id }))) === null || _a === void 0 ? void 0 : _a.wallet;
    if (!userWallet)
        throw new AppError_1.AppError("Wallet not found", 500);
    if (period) {
        const date = DateUtils_1.default.periodToDateString(period);
        const history = yield historyRepo.find({
            select: {
                receiverId: {
                    name: true,
                    email: true,
                    documentId: true,
                },
                senderId: {
                    name: true,
                    email: true,
                    documentId: true,
                },
            },
            where: [
                {
                    date: (0, typeorm_1.MoreThanOrEqual)(date),
                    senderId: {
                        documentId: id,
                    },
                },
                {
                    date: (0, typeorm_1.MoreThanOrEqual)(date),
                    receiverId: {
                        documentId: id,
                    },
                },
            ],
            relations: {
                senderId: true,
                receiverId: true,
            },
            order: {
                date: "DESC",
                hour: "DESC",
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
            select: {
                receiverId: {
                    name: true,
                    email: true,
                    documentId: true,
                },
                senderId: {
                    name: true,
                    email: true,
                    documentId: true,
                },
            },
            where: [
                {
                    date: comparison,
                    senderId: {
                        documentId: id,
                    },
                },
                {
                    date: comparison,
                    receiverId: {
                        documentId: id,
                    },
                },
            ],
            relations: {
                receiverId: true,
                senderId: true,
            },
            order: {
                date: "DESC",
                hour: "DESC",
            },
        });
        return history;
    }
    return yield historyRepo.find({
        select: {
            receiverId: {
                name: true,
                email: true,
                documentId: true,
            },
            senderId: {
                name: true,
                email: true,
                documentId: true,
            },
        },
        where: [
            {
                senderId: {
                    documentId: id,
                },
            },
            {
                receiverId: {
                    documentId: id,
                },
            },
        ],
        relations: {
            receiverId: true,
            senderId: true,
        },
        order: {
            date: "DESC",
            hour: "DESC",
        },
    });
});
exports.default = getHistoryService;
