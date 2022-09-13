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
const transactions_entity_1 = __importDefault(require("./transactions.entity"));
let Wallets = class Wallets {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Wallets.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", { precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Wallets.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Wallets.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Wallets.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => transactions_entity_1.default, (transactions) => transactions.receiverWallet),
    __metadata("design:type", Array)
], Wallets.prototype, "receiverTransactions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => transactions_entity_1.default, (transactions) => transactions.senderWallet),
    __metadata("design:type", Array)
], Wallets.prototype, "senderTransactions", void 0);
Wallets = __decorate([
    (0, typeorm_1.Entity)()
], Wallets);
exports.default = Wallets;
