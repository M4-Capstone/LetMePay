"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sessions_controller_1 = require("../controllers/sessions.controller");
const validateSchema_middleware_1 = require("../middleware/validateSchema.middleware");
const session_schema_1 = require("../schemas/session.schema");
const sessionRoutes = (0, express_1.Router)();
sessionRoutes.post("", (0, validateSchema_middleware_1.validateSchemaMiddleware)(session_schema_1.sessionSchema), sessions_controller_1.createSessionController);
exports.default = sessionRoutes;
