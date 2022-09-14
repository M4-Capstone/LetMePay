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
const transactionCategories_entity_1 = __importDefault(require("./transactionCategories.entity"));
const users_entity_1 = __importDefault(require("./users.entity"));
const wallets_entity_1 = __importDefault(require("./wallets.entity"));
let Transaction = class Transaction {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Transaction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", { precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], Transaction.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)("date"),
    __metadata("design:type", String)
], Transaction.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)("time"),
    __metadata("design:type", String)
], Transaction.prototype, "hour", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => transactionCategories_entity_1.default, { eager: true, nullable: false }),
    __metadata("design:type", transactionCategories_entity_1.default)
], Transaction.prototype, "categoryType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => wallets_entity_1.default, { nullable: false }),
    __metadata("design:type", wallets_entity_1.default)
], Transaction.prototype, "receiverWallet", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => wallets_entity_1.default, { nullable: true }),
    __metadata("design:type", wallets_entity_1.default)
], Transaction.prototype, "senderWallet", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.default, (user) => user.receiverTransactions),
    __metadata("design:type", users_entity_1.default)
], Transaction.prototype, "receiverId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.default, (user) => user.senderTransactions, { nullable: true }),
    __metadata("design:type", users_entity_1.default)
], Transaction.prototype, "senderId", void 0);
Transaction = __decorate([
    (0, typeorm_1.Entity)()
], Transaction);
exports.default = Transaction;
