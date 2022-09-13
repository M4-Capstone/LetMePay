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
const addresses_entity_1 = __importDefault(require("../../entities/addresses.entity"));
const createAddressService = ({ zipCode, street, number, neighbourhood, city, state }, customManager) => __awaiter(void 0, void 0, void 0, function* () {
    const addrRepo = data_source_1.default.getRepository(addresses_entity_1.default);
    const manager = customManager || addrRepo.manager;
    // const foundAddress = await addrRepo.findOneBy([
    //   { zipCode },
    //   { street, number, neighbourhood },
    // ]);
    // if (foundAddress)
    //   throw new AppError("There is already an existing address", 409);
    // seria interessante permitir enderecos iguais, pois podem ser da mesma familia ou etc.
    const address = manager.create(addresses_entity_1.default, {
        zipCode,
        street,
        number,
        neighbourhood,
        city,
        state,
    });
    const savedAddress = yield manager.save(address);
    return savedAddress;
});
exports.default = createAddressService;
