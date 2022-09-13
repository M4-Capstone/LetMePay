"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("../controllers/users.controllers");
const ensureAuth_middleware_1 = __importDefault(require("../middleware/ensureAuth.middleware"));
const isActive_middleware_1 = require("../middleware/isActive.middleware");
const routes = (0, express_1.Router)();
routes.get("", ensureAuth_middleware_1.default, isActive_middleware_1.userIsActiveMiddleware, users_controllers_1.getCurrentUserController);
routes.get("/:keyword", ensureAuth_middleware_1.default, isActive_middleware_1.userIsActiveMiddleware, users_controllers_1.getUserKeywordController);
exports.default = routes;
