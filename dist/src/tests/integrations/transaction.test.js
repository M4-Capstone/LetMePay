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
const transactionMocks_1 = require("../mocks/transactionMocks");
let token;
let userReceiverCreatedforTransfer;
let userCreated;
describe("/transactions", () => {
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
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test("POST /users - should be able to create an User", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/users").send(transactionMocks_1.mockedUser);
        userCreated = response.body;
    }));
    test("POST /login - should be able to create session", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).post("/login").send(transactionMocks_1.mockedUserLogin);
        token = res.body.token;
    }));
    test("POST /users - should be able to create an user for transfer transaction", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/users")
            .send(transactionMocks_1.mockedUserReceiverOnTransfer);
        userReceiverCreatedforTransfer = res.body;
    }));
    test("creating transactions types", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default)
            .post("/categories")
            .set("Authorization", `Bearer ${token}`)
            .send({ type: "dp" });
        yield (0, supertest_1.default)(app_1.default)
            .post("/categories")
            .set("Authorization", `Bearer ${token}`)
            .send({ type: "tf" });
        yield (0, supertest_1.default)(app_1.default)
            .post("/categories")
            .set("Authorization", `Bearer ${token}`)
            .send({ type: "wd" });
    }));
    test("POST /transactions -  Must be able to create a deposit transaction", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/transactions/deposit")
            .set("Authorization", `Bearer ${token}`)
            .send(transactionMocks_1.mockedTransactionDeposit);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("status");
        expect(response.body.message).toEqual("Deposit transaction successfully created");
        expect(response.body.status).toEqual("Receipt sent to customers email");
    }));
    test("POST /transactions -  Must be able to create a withdraw transaction", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/transactions/withdraw")
            .set("Authorization", `Bearer ${token}`)
            .send(transactionMocks_1.mockedTransactionWithdraw);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("status");
        expect(response.body.message).toEqual("Withdraw transaction successfully created");
        expect(response.body.status).toEqual("Receipt sent to customers email");
    }));
    test("POST /transactions -  Must be able to create a transfer transaction", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/transactions/transfer")
            .set("Authorization", `Bearer ${token}`)
            .send(transactionMocks_1.mockedTransactionTransfer);
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("status");
        expect(response.body.message).toEqual("Transfer transaction successfully created");
        expect(response.body.status).toEqual("Receipt sent to customers email");
        expect(response.status).toBe(200);
    }));
    test("POST /transactions -  Trying to create a deposit transaction without authentication token", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/transactions/deposit")
            .send(transactionMocks_1.mockedInvalidTransactionDeposit);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    }));
    test("POST /transactions -  Trying to create a withdraw transaction without authentication token", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/transactions/withdraw")
            .send(transactionMocks_1.mockedInvalidTransactionWithdraw);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
    }));
    test("POST /transactions -  Trying to create a transfer transaction without authentication token", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/transactions/transfer")
            .send(transactionMocks_1.mockedTransactionTransfer);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
    }));
    test("POST /transactions -  Trying to create a invalid deposit transaction by invalid amount", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/transactions/deposit")
            .set("Authorization", `Bearer ${token}`)
            .send(transactionMocks_1.mockedInvalidTransactionDeposit);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("Amount not allowed");
    }));
    test("POST /transactions -  Trying to create a invalid withdraw transaction by invalid amount", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/transactions/withdraw")
            .set("Authorization", `Bearer ${token}`)
            .send(transactionMocks_1.mockedInvalidTransactionWithdraw);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("Amount not allowed");
    }));
    test("POST /transactions -  Trying to create a invalid transfer transaction by invalid amount", () => __awaiter(void 0, void 0, void 0, function* () {
        transactionMocks_1.mockedTransactionTransfer.amount = 0;
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/transactions/transfer")
            .set("Authorization", `Bearer ${token}`)
            .send(transactionMocks_1.mockedTransactionTransfer);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(400);
    }));
    test("POST /transactions -  Trying to create a invalid deposit transaction by different documentID", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/transactions/deposit")
            .set("Authorization", `Bearer ${token}`)
            .send(transactionMocks_1.mockedInvalidTransactionDepositByReceiver);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("The wallet does not belong to this user");
        expect(response.status).toBe(403);
    }));
    test("POST /transactions -  Trying to create a invalid withdraw transaction by different documentID", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/transactions/deposit")
            .set("Authorization", `Bearer ${token}`)
            .send(transactionMocks_1.mockedInvalidTransactionWithdrawByReceiver);
        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("The wallet does not belong to this user");
    }));
    test("POST /transactions -  Create a deposite transaction for next tests", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default)
            .post("/transactions/deposit")
            .set("Authorization", `Bearer ${token}`)
            .send(transactionMocks_1.mockedTransactionDeposit2);
    }));
    test("POST /transactions -  Trying to create a withdraw transaction by invalid amount", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/transactions/withdraw")
            .set("Authorization", `Bearer ${token}`)
            .send(transactionMocks_1.mockedInvalidTransactionWithdraw);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(400);
    }));
    test("POST /transactions -  Trying to create a transfer transaction by invalid amount", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/transactions/transfer")
            .set("Authorization", `Bearer ${token}`)
            .send(transactionMocks_1.mockedInvalidTransactionTransferByAmount);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(400);
    }));
    test("POST /transactions -  Trying to create a transfer transaction by by different documentID", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/transactions/transfer")
            .set("Authorization", `Bearer ${token}`)
            .send(transactionMocks_1.mockedInvalidTransactionTransferByReceiver);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(404);
    }));
    test("POST /transactions -  Trying to create a transfer transaction by sender not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/transactions/transfer")
            .set("Authorization", `Bearer ${token}`)
            .send(transactionMocks_1.mockedInvalidTransactionTransferBySender);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(403);
    }));
});
