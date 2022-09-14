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
exports.getAllCategoriesController = exports.createCategoryController = void 0;
const createNewCategory_service_1 = __importDefault(require("../services/categories/createNewCategory.service"));
const getAllCategories_service_1 = __importDefault(require("../services/categories/getAllCategories.service"));
const createCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type } = req.body;
    const newCategory = yield (0, createNewCategory_service_1.default)(type);
    return res.status(201).json(newCategory);
});
exports.createCategoryController = createCategoryController;
const getAllCategoriesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listCategories = yield (0, getAllCategories_service_1.default)();
    return res.json(listCategories);
});
exports.getAllCategoriesController = getAllCategoriesController;
