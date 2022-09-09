"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockedInvalidTransactionTransferByReceiver = exports.mockedInvalidTransactionTransferBySender = exports.mockedInvalidTransactionTransferByAmount = exports.mockedTransactionTransfer = exports.mockedInvalidTransactionWithdrawByReceiver = exports.mockedInvalidTransactionWithdraw = exports.mockedTransactionWithdraw = exports.mockedInvalidTransactionDepositByReceiver = exports.mockedInvalidTransactionDeposit = exports.mockedTransactionDeposit2 = exports.mockedTransactionDeposit = exports.transactionType = exports.mockedUserLogin = exports.mockedUserReceiver = exports.mockedUser = exports.mockedAddress2 = exports.mockedAddress = void 0;
exports.mockedAddress = {
    zipCode: '123654789',
    street: 'Rua dos Pigmeus',
    number: '101',
    neighborhood: 'Alvorada',
    city: 'Piracicaba',
    state: 'Sao Paulo',
};
exports.mockedAddress2 = {
    zipCode: '123654777',
    street: 'Rua do Veio',
    number: '88',
    neighborhood: 'Alemao',
    city: 'Santo Andre',
    state: 'Sao Paulo',
};
exports.mockedUser = {
    id: 'qualquerId',
    name: 'Gustavo',
    email: 'gustavo@fakemail.com',
    password: '123456',
    documentId: '11122233344',
    address: exports.mockedAddress,
};
exports.mockedUserReceiver = {
    id: 'qualquerId2',
    name: 'Marco',
    email: 'marco@fakemail.com',
    password: '123456',
    documentId: '00011122233',
    address: exports.mockedAddress2,
};
exports.mockedUserLogin = {
    email: 'gustavo@fakemail.com',
    password: '123456',
};
exports.transactionType = {
    withdraw: 'wd',
    deposit: 'dp',
    transfer: 'tf',
};
exports.mockedTransactionDeposit = {
    amount: 500,
    receiverWalletId: 'gustavoWalletId',
    documentId: '00011122233',
};
exports.mockedTransactionDeposit2 = {
    amount: 100,
    receiverWalletId: 'gustavoWalletId',
    documentId: '00011122233',
};
exports.mockedInvalidTransactionDeposit = {
    amount: 0,
    receiverWalletId: 'gustavoWalletId',
    documentId: '00011122233',
};
exports.mockedInvalidTransactionDepositByReceiver = {
    amount: 250,
    receiverWalletId: 'gustavoWalletId',
    documentId: '00000000002',
};
exports.mockedTransactionWithdraw = {
    amount: 250,
    receiverWalletId: 'gustavoWalletId',
    documentId: '11122233344',
};
exports.mockedInvalidTransactionWithdraw = {
    amount: 0,
    receiverWalletId: 'gustavoWalletId',
    documentId: '11122233344',
};
exports.mockedInvalidTransactionWithdrawByReceiver = {
    amount: 0,
    receiverWalletId: 'gustavoWalletId',
    documentId: '00000000002',
};
exports.mockedTransactionTransfer = {
    amount: 250,
    receiverDocumentId: '11122233344',
    senderDocumentId: '22211100034',
    senderWalletId: 'senderWalletId',
};
exports.mockedInvalidTransactionTransferByAmount = {
    amount: 0,
    receiverDocumentId: '22211100034',
    senderDocumentId: '11122233344',
    senderWalletId: 'senderWalletId',
};
exports.mockedInvalidTransactionTransferBySender = {
    amount: 0,
    receiverDocumentId: '22211100034',
    senderDocumentId: '00000000002',
    senderWalletId: 'senderWalletId',
};
exports.mockedInvalidTransactionTransferByReceiver = {
    amount: 0,
    receiverDocumentId: '00000000001',
    senderDocumentId: '11122233344',
    senderWalletId: 'senderWalletId',
};
