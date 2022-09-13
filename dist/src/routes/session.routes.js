"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sessions_controller_1 = require("../controllers/sessions.controller");
const sessionRoutes = (0, express_1.Router)();
sessionRoutes.post("", sessions_controller_1.createSessionController);
exports.default = sessionRoutes;
