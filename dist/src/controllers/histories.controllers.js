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
exports.getHistoryByTypeController = exports.getTransactionController = exports.getHistoryController = void 0;
const getHistory_service_1 = __importDefault(require("../services/histories/getHistory.service"));
const getHistoryByType_service_1 = __importDefault(require("../services/histories/getHistoryByType.service"));
const getTransaction_service_1 = __importDefault(require("../services/histories/getTransaction.service"));
const getHistoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { period, startDate, endDate } = req.query;
    const userId = req.user.id;
    const history = yield (0, getHistory_service_1.default)(userId, {
        period,
        startDate,
        endDate,
    });
    return res.json(history);
});
exports.getHistoryController = getHistoryController;
const getTransactionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const transaction = yield (0, getTransaction_service_1.default)(id);
    return res.json(transaction);
});
exports.getTransactionController = getTransactionController;
const getHistoryByTypeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { period, startDate, endDate } = req.query;
    const userId = req.user.id;
    const { type } = req.params;
    const history = yield (0, getHistoryByType_service_1.default)(userId, type, {
        period,
        startDate,
        endDate,
    });
    return res.json(history);
});
exports.getHistoryByTypeController = getHistoryByTypeController;
