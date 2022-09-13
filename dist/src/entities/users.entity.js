"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const addresses_entity_1 = __importDefault(require("./addresses.entity"));
const wallets_entity_1 = __importDefault(require("./wallets.entity"));
let Users = class Users {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)("varchar", { length: 14 }),
    __metadata("design:type", String)
], Users.prototype, "documentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 70, unique: true }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 160 }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Users.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Users.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Users.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => addresses_entity_1.default, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", addresses_entity_1.default)
], Users.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => wallets_entity_1.default, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", wallets_entity_1.default)
], Users.prototype, "wallet", void 0);
Users = __decorate([
    (0, typeorm_1.Entity)()
], Users);
exports.default = Users;
