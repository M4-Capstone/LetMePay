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
let userReceiverCreated;
let userCreated;
describe('/transactions', () => {
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
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test('POST /users - should be able to create an User', () => __awaiter(void 0, void 0, void 0, function* () {
        userCreated = yield (0, supertest_1.default)(app_1.default).post('/users').send(transactionMocks_1.mockedUser);
    }));
    test('POST /login - should be able to create session', () => __awaiter(void 0, void 0, void 0, function* () {
        token = yield (0, supertest_1.default)(app_1.default).post('/login').send(transactionMocks_1.mockedUserLogin);
    }));
    test('POST /users - should be able to create an User', () => __awaiter(void 0, void 0, void 0, function* () {
        userReceiverCreated = yield (0, supertest_1.default)(app_1.default)
            .post('/users')
            .send(transactionMocks_1.mockedUserReceiver);
    }));
    // criacao de deposito
    test('POST /transactions -  Must be able to create a deposite transaction', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/transactions/deposit')
            .set('Authorization', `Bearer ${token}`)
            .send(transactionMocks_1.mockedTransactionDeposit);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('status');
        expect(response.body.message).toBe('Transaction successfully created');
        expect(response.body.status).toBe('Receipt sent to customers email');
    }));
    // criacao de saque
    test('POST /transactions -  Must be able to create a withdraw transaction', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/transactions/withdraw')
            .set('Authorization', `Bearer ${token}`)
            .send(transactionMocks_1.mockedTransactionTransfer);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('status');
        expect(response.body.message).toBe('Transaction successfully created');
        expect(response.body.status).toBe('Receipt sent to customers email');
    }));
    // criacao de transferencia
    test('POST /transactions -  Must be able to create a transfer transaction', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/transactions/transfer')
            .set('Authorization', `Bearer ${token}`)
            .send(transactionMocks_1.mockedTransactionWithdraw);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('status');
        expect(response.body.message).toBe('Transaction successfully created');
        expect(response.body.status).toBe('Receipt sent to customers email');
    }));
    // deposito sem autenticacao
    test('POST /transactions -  Trying to create a deposit transaction without authentication token', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/transactions/deposit')
            .send(transactionMocks_1.mockedInvalidTransactionDeposit);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('status');
        expect(response.body.message).toBe('Wallet or user not found');
    }));
    // saque sem autenticacao
    test('POST /transactions -  Trying to create a withdraw transaction without authentication token', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/transactions/withdraw')
            .send(transactionMocks_1.mockedInvalidTransactionWithdraw);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('status');
        expect(response.body.message).toBe('Wallet or user not found');
    }));
    // transferencia sem autenticacao
    test('POST /transactions -  Trying to create a transfer transaction without authentication token', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/transactions/transfer')
            .send(transactionMocks_1.mockedTransactionTransfer);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('status');
        expect(response.body.message).toBe('Wallet or user not found');
    }));
    // deposito no valor de 0 reais
    test('POST /transactions -  Trying to create a invalid deposite transaction by invalid amount', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/transactions/deposit')
            .set('Authorization', `Bearer ${token}`)
            .send(transactionMocks_1.mockedInvalidTransactionDeposit);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('status');
        expect(response.body.message).toBe('Amount not allowed');
    }));
    // saque no valor de 0 reais
    test('POST /transactions -  Trying to create a invalid withdraw transaction by invalid amount', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/transactions/withdraw')
            .set('Authorization', `Bearer ${token}`)
            .send(transactionMocks_1.mockedInvalidTransactionWithdraw);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('status');
        expect(response.body.message).toBe('Amount not allowed');
    }));
    // transferencia no valor de 0 reais
    test('POST /transactions -  Trying to create a invalid transfer transaction by invalid amount', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/transactions/tranfer')
            .set('Authorization', `Bearer ${token}`)
            .send(transactionMocks_1.mockedInvalidTransactionTransferByAmount);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('status');
        expect(response.body.message).toBe('Amount not allowed');
    }));
    // deposito para conta inexistente
    test('POST /transactions -  Trying to create a invalid deposite transaction by receiver not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/transactions/deposit')
            .set('Authorization', `Bearer ${token}`)
            .send(transactionMocks_1.mockedInvalidTransactionDepositByReceiver);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('status');
        expect(response.body.message).toBe('Wallet or user not found');
    }));
    // saque de uma conta inexistente
    test('POST /transactions -  Trying to create a invalid withdraw transaction by receiver not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/transactions/deposit')
            .set('Authorization', `Bearer ${token}`)
            .send(transactionMocks_1.mockedInvalidTransactionWithdrawByReceiver);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('status');
        expect(response.body.message).toBe('Wallet or user not found');
    }));
    // deposito
    test('POST /transactions -  Create a deposite transaction for next tests', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default)
            .post('/transactions/deposit')
            .set('Authorization', `Bearer ${token}`)
            .send(transactionMocks_1.mockedTransactionDeposit2);
    }));
    // saque com um valor maior do que o valor em conta
    test('POST /transactions -  Trying to create a withdraw transaction by invalid amount', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/transactions/withdraw')
            .set('Authorization', `Bearer ${token}`)
            .send(transactionMocks_1.mockedTransactionWithdraw);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('User does not have the money to perform the transaction');
    }));
    // transferencia com um valor maior do que o valor em conta
    test('POST /transactions -  Trying to create a transfer transaction by invalid amount', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/transactions/transfer')
            .set('Authorization', `Bearer ${token}`)
            .send(transactionMocks_1.mockedTransactionTransfer);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('User does not have the money to perform the transaction');
    }));
    // transferencia para um usuario inexistente
    test('POST /transactions -  Trying to create a transfer transaction by receiver not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/transactions/transfer')
            .set('Authorization', `Bearer ${token}`)
            .send(transactionMocks_1.mockedInvalidTransactionTransferByReceiver);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('Wallet or user not found');
    }));
    // transferencia de uma origem inexistente
    test('POST /transactions -  Trying to create a transfer transaction by sender not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/transactions/transfer')
            .set('Authorization', `Bearer ${token}`)
            .send(transactionMocks_1.mockedInvalidTransactionTransferBySender);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('Wallet or user not found');
    }));
});
