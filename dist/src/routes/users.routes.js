"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("../controllers/users.controllers");
const usersRoutes = (0, express_1.Router)();
// usersRoutes.get("/:id", ensureAuthMiddleware, getCurrentUserController);
usersRoutes.post("", users_controllers_1.createUserController);
exports.default = usersRoutes;
