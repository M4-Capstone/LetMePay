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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const mocks_1 = require("../mocks");
describe('/users', () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize()
            .then((res) => {
            connection = res;
        })
            .catch((err) => {
            console.error('Error during Data Source initialization', err);
        });
    }));
    test('POST /users - Must be able to create a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post('/users').send(mocks_1.mockedUser);
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('email');
        expect(response.body).not.toHaveProperty('password');
        expect(response.body).toHaveProperty('documentId');
        expect(response.body).toHaveProperty('isActive');
        expect(response.body).toHaveProperty('createdAt');
        expect(response.body).toHaveProperty('updatedAt');
        expect(response.body).toHaveProperty('address');
        expect(response.body.name).toEqual('Felipe');
        expect(response.body.email).toEqual('felipe@mail.com');
        expect(response.body.documentId).toEqual('123456789');
        expect(response.body.isActive).toEqual(true);
        expect(response.status).toBe(201);
    }));
    test('POST /users - should not be able to create a user that already exists', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post('/users').send(mocks_1.mockedUser);
        expect(response.body).toHaveProperty('message');
        expect(response.status).toBe(400);
    }));
    test('GET /users - Get current user using token', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get('/users')
            .set('Authorization', `Bearer${'token'}`);
        expect(response.body).toHaveLength(2);
    }));
    test('GET /users - Get without token', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get('/users').send(mocks_1.mockedUser);
        expect(response.body).toHaveProperty('message');
        expect(response.status).toBe(401);
    }));
    test('GET /users - Get user with invalid token', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get('/users').send(mocks_1.mockedUser);
        expect(response.body).toHaveProperty('message');
        expect(response.status).toBe(403);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
});
