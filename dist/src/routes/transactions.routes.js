"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const depositTransaction_controller_1 = require("../controllers/transactions/post/depositTransaction.controller");
const transferTransaction_controller_1 = require("../controllers/transactions/post/transferTransaction.controller");
const withdrawTransaction_controller_1 = require("../controllers/transactions/post/withdrawTransaction.controller");
const ensureAuth_middleware_1 = __importDefault(require("../middleware/ensureAuth.middleware"));
const transactionRoutes = (0, express_1.Router)();
transactionRoutes.post('/transfer', ensureAuth_middleware_1.default, transferTransaction_controller_1.transferTransactionController);
transactionRoutes.post('/deposit', ensureAuth_middleware_1.default, depositTransaction_controller_1.depositTransactionController);
transactionRoutes.post('/withdraw', ensureAuth_middleware_1.default, withdrawTransaction_controller_1.withdrawTransactionController);
exports.default = transactionRoutes;
