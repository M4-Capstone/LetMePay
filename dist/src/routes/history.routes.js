"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const histories_controllers_1 = require("../controllers/histories.controllers");
const ensureAuth_middleware_1 = __importDefault(require("../middleware/ensureAuth.middleware"));
const historyRoutes = (0, express_1.Router)();
historyRoutes.get("", ensureAuth_middleware_1.default, histories_controllers_1.getHistoryController); // period comes as query params
historyRoutes.get("/:type", ensureAuth_middleware_1.default, histories_controllers_1.getHistoryByTypeController);
historyRoutes.get("/transaction/:id", ensureAuth_middleware_1.default, histories_controllers_1.getTransactionController);
exports.default = historyRoutes;
