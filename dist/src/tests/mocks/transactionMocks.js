"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockedInvalidTransactionTransferByReceiver = exports.mockedInvalidTransactionTransferBySender = exports.mockedInvalidTransactionTransferByAmount = exports.mockedTransactionTransfer = exports.mockedInvalidTransactionWithdrawByReceiver = exports.mockedInvalidTransactionWithdraw = exports.mockedTransactionWithdraw = exports.mockedInvalidTransactionDepositByReceiver = exports.mockedInvalidTransactionDeposit = exports.mockedTransactionDeposit2 = exports.mockedTransactionDeposit = exports.transactionType = exports.mockedUserLogin = exports.mockedUserReceiverOnTransfer = exports.mockedUser = void 0;
exports.mockedUser = {
    name: "gumervaldo abilio",
    email: "marcoLetMePay@outlook.com",
    password: "seila9000",
    documentId: "44499944488",
    address: {
        zipCode: "99970999",
        street: "rua treze de maio",
        number: "90",
        neighbourhood: "santa fe",
        city: "sao paulo",
        state: "sp",
    },
};
exports.mockedUserReceiverOnTransfer = {
    name: "americo da silva",
    email: "antonielLetMePay@outlook.com",
    password: "seila9000",
    documentId: "55566677788",
    address: {
        zipCode: "88444000",
        street: "Rua Aparecida do Norte",
        number: "4000",
        neighbourhood: "Paulista",
        city: "sao paulo",
        state: "sp",
    },
};
exports.mockedUserLogin = {
    email: "marcoLetMePay@outlook.com",
    password: "seila9000",
};
exports.transactionType = {
    withdraw: "wd",
    deposit: "dp",
    transfer: "tf",
};
exports.mockedTransactionDeposit = {
    amount: 500,
    documentId: "44499944488",
};
exports.mockedTransactionDeposit2 = {
    amount: 100,
    documentId: "44499944488",
};
exports.mockedInvalidTransactionDeposit = {
    amount: 0,
    documentId: "44499944488",
};
exports.mockedInvalidTransactionDepositByReceiver = {
    amount: 250,
    documentId: "00000000002",
};
exports.mockedTransactionWithdraw = {
    amount: 250,
    documentId: "44499944488",
};
exports.mockedInvalidTransactionWithdraw = {
    amount: 0,
    documentId: "44499944488",
};
exports.mockedInvalidTransactionWithdrawByReceiver = {
    amount: 0,
    documentId: "00000000002",
};
exports.mockedTransactionTransfer = {
    amount: 250,
    receiverDocumentId: "55566677788",
    senderDocumentId: "44499944488",
};
exports.mockedInvalidTransactionTransferByAmount = {
    amount: 0,
    receiverDocumentId: "55566677788",
    senderDocumentId: "44499944488",
};
exports.mockedInvalidTransactionTransferBySender = {
    amount: 50,
    receiverDocumentId: "55566677788",
    senderDocumentId: "444",
};
exports.mockedInvalidTransactionTransferByReceiver = {
    amount: 50,
    receiverDocumentId: "12",
    senderDocumentId: "44499944488",
};
