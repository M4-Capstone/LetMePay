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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let Addresses = class Addresses {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Addresses.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 60 }),
    __metadata("design:type", String)
], Addresses.prototype, "neighbourhood", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 8 }),
    __metadata("design:type", String)
], Addresses.prototype, "zipCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 60 }),
    __metadata("design:type", String)
], Addresses.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 6, nullable: true }),
    __metadata("design:type", String)
], Addresses.prototype, "number", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 60 }),
    __metadata("design:type", String)
], Addresses.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 2 }),
    __metadata("design:type", String)
], Addresses.prototype, "state", void 0);
Addresses = __decorate([
    (0, typeorm_1.Entity)()
], Addresses);
exports.default = Addresses;
