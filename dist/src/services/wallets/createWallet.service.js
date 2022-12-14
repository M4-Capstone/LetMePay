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
const wallets_entity_1 = __importDefault(require("../../entities/wallets.entity"));
const createWalletService = ({ ownerDocument }, customManager) => __awaiter(void 0, void 0, void 0, function* () {
    const walletRepo = data_source_1.default.getRepository(wallets_entity_1.default);
    const manager = customManager || walletRepo.manager;
    /* const foundWallet = await walletRepo.findOneBy({
      owner: { documentId: ownerDocument },
    });
    if (foundWallet)
      throw new AppError(
        "There is already an existing wallet for this user",
        409
      ); */
    //const user = await getCurrentUserService(ownerDocument);
    const wallet = manager.create(wallets_entity_1.default);
    const savedWallet = yield manager.save(wallet);
    return savedWallet;
});
exports.default = createWalletService;
