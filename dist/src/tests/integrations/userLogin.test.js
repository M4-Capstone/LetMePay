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
const index_1 = require("../mocks/index");
describe("/login", () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize()
            .then((res) => {
            connection = res;
        })
            .catch((err) => {
            console.log("Error during Data Source initialization", err);
        });
        yield (0, supertest_1.default)(app_1.default).post("/users").send(index_1.mockedUser);
    }));
    test("POST /login - Should be able to login with the user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/login").send(index_1.mockedUserLogin);
        expect(response.body).toHaveProperty("token");
        expect(response.status).toBe(200);
    }));
    test("POST /login - Should not be able to login with the user with incorrect password", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post('/login').send(index_1.mockedUserIncorrectLoginPassword);
        expect(response.body).toHaveProperty("message");
        expect(response.statusCode).toBe(401);
    }));
    test("POST /login - Should not be able to login with the user with incorrect email", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post('/login').send(index_1.mockedUserIncorrectLoginEmail);
        expect(response.body).toHaveProperty("message");
        expect(response.statusCode).toBe(401);
    }));
    test("POST /login - Should not be able to login without field password", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post('/login').send(index_1.mockedUserWithoutPassword);
        expect(response.body).toHaveProperty("message");
        expect(response.statusCode).toBe(400);
    }));
    test("POST /login - Should not be able to login without field email", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post('/login').send(index_1.mockedUserWithoutEmail);
        expect(response.body).toHaveProperty("message");
        expect(response.statusCode).toBe(400);
    }));
    test("POST /login - Should not be able to login without register", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post('/login').send(index_1.mockedUserWithoutRegister);
        expect(response.body).toHaveProperty("message");
        expect(response.statusCode).toBe(401);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
});
