"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ensureAuth_middleware_1 = __importDefault(require("../middleware/ensureAuth.middleware"));
const categories_controller_1 = require("../controllers/categories.controller");
const isActive_middleware_1 = require("../middleware/isActive.middleware");
const categoriesRoutes = (0, express_1.Router)();
categoriesRoutes.post("", ensureAuth_middleware_1.default, isActive_middleware_1.userIsActiveMiddleware, categories_controller_1.createCategoryController);
categoriesRoutes.get("", ensureAuth_middleware_1.default, isActive_middleware_1.userIsActiveMiddleware, categories_controller_1.getAllCategoriesController);
exports.default = categoriesRoutes;
