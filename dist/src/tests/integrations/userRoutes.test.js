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
describe("/users", () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize()
            .then((res) => {
            connection = res;
        })
            .catch((err) => {
            console.log("Error during Data Source initialization", err);
        });
    }));
    test("POST /users - Must be able to create a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/users").send(index_1.mockedUser);
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("email");
        expect(response.body).not.toHaveProperty("password");
        expect(response.body).toHaveProperty("documentId");
        expect(response.body).toHaveProperty("isActive");
        expect(response.body).toHaveProperty("createdAt");
        expect(response.body).toHaveProperty("updatedAt");
        expect(response.body).toHaveProperty("address");
        expect(response.body.name).toEqual(index_1.mockedUser.name);
        expect(response.body.email).toEqual(index_1.mockedUser.email);
        expect(response.body.documentId).toEqual(index_1.mockedUser.documentId);
        expect(response.body.isActive).toEqual(true);
        expect(response.status).toBe(201);
    }));
    test("POST /users - Should not be able to create a user that already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/users").send(index_1.mockedUser);
        expect(response.body).toHaveProperty("message");
        expect(response.body).toEqual({ message: "User already exists" });
        expect(response.statusCode).toBe(409);
    }));
    test("GET /profile - Get current user using token", () => __awaiter(void 0, void 0, void 0, function* () {
        const responseLogin = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send(index_1.mockedUserLogin);
        const idUser = index_1.mockedUser.documentId;
        expect(responseLogin.statusCode).toBe(200);
        expect(responseLogin.body).toHaveProperty("token");
        const token = responseLogin.body.token;
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/profile/${idUser}`)
            .set("Authorization", `Bearer ${token}`);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.statusCode).toBe(200);
    }));
    test("GET /profile - Get user with invalid token", () => __awaiter(void 0, void 0, void 0, function* () {
        const responseLogin = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send(index_1.mockedUserLogin);
        const idUser = index_1.mockedUser.documentId;
        expect(responseLogin.statusCode).toBe(200);
        expect(responseLogin.body).toHaveProperty("token");
        const tokenIncorrect = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVucmljb0BtYWlsLmNvbSJ9.nMJdHJp27mEYWcOvtlLugwR0RnAhCH841A1gJhFGkHY"; //token gerado para verificação de um usuario falso
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/profile/${idUser}`)
            .set("Authorization", `Bearer ${tokenIncorrect}`);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    }));
    test("GET /profile - Get user with invalid document id", () => __awaiter(void 0, void 0, void 0, function* () {
        const responseLogin = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send(index_1.mockedUserLogin);
        const idUser = 743536213;
        expect(responseLogin.statusCode).toBe(200);
        expect(responseLogin.body).toHaveProperty("token");
        const tokenCorrect = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVucmljb0BtYWlsLmNvbSJ9.nMJdHJp27mEYWcOvtlLugwR0RnAhCH841A1gJhFGkHY"; //token gerado para verificação de um usuario falso
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/profile/${idUser}`)
            .set("Authorization", `Bearer ${tokenCorrect}`);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    }));
    test("GET /profile/:keyword - Must be able get user using keyword", () => __awaiter(void 0, void 0, void 0, function* () {
        const responseLogin = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send(index_1.mockedUserLogin);
        expect(responseLogin.statusCode).toBe(200);
        expect(responseLogin.body).toHaveProperty("token");
        const token = responseLogin.body.token;
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/profile/123`)
            .set("Authorization", `Bearer ${token}`);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.statusCode).toBe(200);
    }));
    test("GET /profile/:keyword - User not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const responseLogin = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send(index_1.mockedUserLogin);
        expect(responseLogin.statusCode).toBe(200);
        expect(responseLogin.body).toHaveProperty("token");
        const token = responseLogin.body.token;
        const incorrectUrl = "000000";
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/profile/${incorrectUrl}`)
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("length");
        expect(response.body).toHaveLength(0);
    }));
    test("UPDATE /users - Should be able update user", () => __awaiter(void 0, void 0, void 0, function* () {
        const responseLogin = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send(index_1.mockedUserLogin);
        expect(responseLogin.statusCode).toBe(200);
        expect(responseLogin.body).toHaveProperty("token");
        const token = responseLogin.body.token;
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch("/users")
            .send(index_1.mockedUserUpdated)
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
    }));
    test("UPDATE /users - User is not active to update", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(index_1.mockedUser);
        const loginResponse = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send(index_1.mockedUserLogin);
        expect(loginResponse.statusCode).toBe(200);
        expect(loginResponse.body).toHaveProperty("token");
        const responseDeleted = yield (0, supertest_1.default)(app_1.default)
            .patch('/users')
            .set("Authorization", `Bearer ${loginResponse.body.token}`);
        expect(responseDeleted.body).toHaveProperty("message");
        expect(responseDeleted.status).toBe(400);
    }));
    test("UPDATE /users - User not found to update", () => __awaiter(void 0, void 0, void 0, function* () {
        const responseLogin = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send(index_1.mockedUserLogin);
        expect(responseLogin.statusCode).toBe(200);
        expect(responseLogin.body).toHaveProperty("token");
        const token = responseLogin.body.token;
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/users`)
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
    }));
    test("DELETE /users - Must be able to soft delete user", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(index_1.mockedUser);
        const loginResponse = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send(index_1.mockedUserLogin);
        const response = yield (0, supertest_1.default)(app_1.default)
            .delete(`/users`)
            .set("Authorization", `Bearer ${loginResponse.body.token}`);
        const findUser = yield (0, supertest_1.default)(app_1.default)
            .get("/users")
            .set("Authorization", `Bearer ${loginResponse.body.token}`);
        expect(response.status).toBe(204);
        expect(findUser.body.isActive).toBe(undefined);
    }));
    test("DELETE /users/:id - User not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const responseLogin = yield (0, supertest_1.default)(app_1.default).post('/login').send(index_1.mockedUserLogin);
        const token = responseLogin.body.token;
        const response = yield (0, supertest_1.default)(app_1.default).delete('/users/123456789').set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toBe(404);
    }));
    test("DELETE /users - User is not active", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(index_1.mockedUser);
        const loginResponse = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send(index_1.mockedUserLogin);
        const response = yield (0, supertest_1.default)(app_1.default)
            .delete(`/users`)
            .set("Authorization", `Bearer ${loginResponse.body.token}`);
        const responseDeleted = yield (0, supertest_1.default)(app_1.default)
            .delete('/users')
            .set("Authorization", `Bearer ${loginResponse.body.token}`);
        expect(responseDeleted.body).toHaveProperty("message");
        expect(responseDeleted.status).toBe(403);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
});
