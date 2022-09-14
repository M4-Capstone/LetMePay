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
const data_source_1 = __importDefault(require("../../data-source"));
const transactionCategories_entity_1 = __importDefault(require("../../entities/transactionCategories.entity"));
const AppError_1 = require("../../errors/AppError");
const accepted = ["dp", "tf", "wd"];
const createNewCategoryService = (type) => __awaiter(void 0, void 0, void 0, function* () {
    if (!type || !accepted.includes(type)) {
        throw new AppError_1.AppError("invalid parameters for category insertion");
    }
    const categoryRepository = data_source_1.default.getRepository(transactionCategories_entity_1.default);
    const categoryAlreadyExists = yield categoryRepository.findOne({
        where: { type },
    });
    if (categoryAlreadyExists) {
        throw new AppError_1.AppError("category already exists", 409);
    }
    const res = yield categoryRepository.save({ type });
    return res;
});
exports.default = createNewCategoryService;
