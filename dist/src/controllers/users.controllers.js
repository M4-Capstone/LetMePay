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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserKeywordController = exports.updateUserController = exports.deleteUserController = exports.getCurrentUserController = exports.createUserController = void 0;
const class_transformer_1 = require("class-transformer");
const createUser_service_1 = __importDefault(require("../services/users/createUser.service"));
const getCurrentUser_service_1 = __importDefault(require("../services/users/getCurrentUser.service"));
const getUserByKeyword_service_1 = __importDefault(require("../services/users/getUserByKeyword.service"));
const deleteUser_service_1 = require("../services/users/deleteUser.service");
const updateUser_service_1 = require("../services/users/updateUser.service");
const getCurrentUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.id;
    const foundUser = yield (0, getCurrentUser_service_1.default)(id);
    const { password } = foundUser, user = __rest(foundUser, ["password"]);
    return res.json(user);
});
exports.getCurrentUserController = getCurrentUserController;
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const newUser = yield (0, createUser_service_1.default)(userData);
    return res.status(201).json((0, class_transformer_1.instanceToPlain)(newUser));
});
exports.createUserController = createUserController;
const getUserKeywordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { keyword } = req.params;
    const user = yield (0, getUserByKeyword_service_1.default)(keyword);
    return res.json((0, class_transformer_1.instanceToPlain)(user));
});
exports.getUserKeywordController = getUserKeywordController;
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const deleteUser = yield (0, deleteUser_service_1.deleteUserService)({ id });
    return res.status(204).send();
});
exports.deleteUserController = deleteUserController;
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.id;
    const { name, email, password, address } = req.body;
    const updateUser = yield (0, updateUser_service_1.updateUserService)(id, { name, email, password, address });
    return res.json((0, class_transformer_1.instanceToPlain)(updateUser));
});
exports.updateUserController = updateUserController;
