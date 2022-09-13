"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("../controllers/users.controllers");
const ensureAuth_middleware_1 = __importDefault(require("../middleware/ensureAuth.middleware"));
const validateSchema_middleware_1 = require("../middleware/validateSchema.middleware");
const user_schema_1 = require("../schemas/user.schema");
const isActive_middleware_1 = require("../middleware/isActive.middleware");
const usersRoutes = (0, express_1.Router)();
usersRoutes.post("", (0, validateSchema_middleware_1.validateSchemaMiddleware)(user_schema_1.newUserSchema), users_controllers_1.createUserController);
usersRoutes.patch("", ensureAuth_middleware_1.default, isActive_middleware_1.userIsActiveMiddleware, (0, validateSchema_middleware_1.validateSchemaMiddleware)(user_schema_1.updateUserSchema), users_controllers_1.updateUserController);
usersRoutes.delete("", ensureAuth_middleware_1.default, isActive_middleware_1.userIsActiveMiddleware, users_controllers_1.deleteUserController);
exports.default = usersRoutes;
