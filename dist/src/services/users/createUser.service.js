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
const bcryptjs_1 = require("bcryptjs");
const data_source_1 = __importDefault(require("../../data-source"));
const users_entity_1 = __importDefault(require("../../entities/users.entity"));
const AppError_1 = require("../../errors/AppError");
const createAddress_service_1 = __importDefault(require("../addresses/createAddress.service"));
const createWallet_service_1 = __importDefault(require("../wallets/createWallet.service"));
const createUserService = ({ documentId, address, email, name, password, }) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = data_source_1.default.getRepository(users_entity_1.default);
    const foundUser = yield userRepo.findOneBy({ documentId });
    if (foundUser)
        throw new AppError_1.AppError("User already exists", 409);
    // faz uma transaction para garantir que
    // todas as entradas nas tabelas poderão ser feitas
    // antes de salvar
    yield userRepo.manager.transaction((manager) => __awaiter(void 0, void 0, void 0, function* () {
        const savedAddress = yield (0, createAddress_service_1.default)(address, manager);
        const savedWallet = yield (0, createWallet_service_1.default)({
            ownerDocument: documentId,
        });
        const user = userRepo.create({
            address: savedAddress,
            wallet: savedWallet,
            documentId,
            email,
            name,
            password: yield (0, bcryptjs_1.hash)(password, 10),
        });
        manager.save(user);
    }));
    const finalUser = yield userRepo.findOneByOrFail({ documentId });
    return finalUser;
});
exports.default = createUserService;
