import {
  IDepositTransaction,
  ITransferTransaction,
  IWithdrawTransaction,
} from "../../interfaces/transactions";

export const mockedUser = {
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

export const mockedUserReceiverOnTransfer = {
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

export const mockedUserLogin = {
  email: "marcoLetMePay@outlook.com",
  password: "seila9000",
};

export const transactionType = {
  withdraw: "wd",
  deposit: "dp",
  transfer: "tf",
};

export const mockedTransactionDeposit: IDepositTransaction = {
  amount: 500,
  receiverWalletId: "",
  documentId: "44499944488",
};
export const mockedTransactionDeposit2: IDepositTransaction = {
  amount: 100,
  receiverWalletId: "",
  documentId: "44499944488",
};

export const mockedInvalidTransactionDeposit: IDepositTransaction = {
  amount: 0,
  receiverWalletId: "",
  documentId: "44499944488",
};

export const mockedInvalidTransactionDepositByReceiver: IDepositTransaction = {
  amount: 250,
  receiverWalletId: "12",
  documentId: "00000000002",
};

export const mockedTransactionWithdraw: IWithdrawTransaction = {
  amount: 250,
  receiverWalletId: "12",
  documentId: "44499944488",
};

export const mockedInvalidTransactionWithdraw: IWithdrawTransaction = {
  amount: 0,
  receiverWalletId: "12",
  documentId: "44499944488",
};

export const mockedInvalidTransactionWithdrawByReceiver: IWithdrawTransaction =
  {
    amount: 0,
    receiverWalletId: "12",
    documentId: "00000000002",
  };

export const mockedTransactionTransfer: ITransferTransaction = {
  amount: 250,
  receiverDocumentId: "55566677788",
  senderDocumentId: "44499944488",
  senderWalletId: "senderWalletId",
};

export const mockedInvalidTransactionTransferByAmount: ITransferTransaction = {
  amount: 0,
  receiverDocumentId: "55566677788",
  senderDocumentId: "44499944488",
  senderWalletId: "senderWalletId",
};

export const mockedInvalidTransactionTransferBySender: ITransferTransaction = {
  amount: 50,
  receiverDocumentId: "55566677788",
  senderDocumentId: "444",
  senderWalletId: "senderWalletId",
};

export const mockedInvalidTransactionTransferByReceiver: ITransferTransaction =
  {
    amount: 50,
    receiverDocumentId: "12",
    senderDocumentId: "44499944488",
    senderWalletId: "senderWalletId",
  };
