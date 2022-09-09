import {
	IDepositTransaction,
	ITransferTransaction,
	IWithdrawTransaction,
} from '../../interfaces/transactions'

export const mockedAddress = {
	zipCode: '123654789',
	street: 'Rua dos Pigmeus',
	number: '101',
	neighborhood: 'Alvorada',
	city: 'Piracicaba',
	state: 'Sao Paulo',
}

export const mockedAddress2 = {
	zipCode: '123654777',
	street: 'Rua do Veio',
	number: '88',
	neighborhood: 'Alemao',
	city: 'Santo Andre',
	state: 'Sao Paulo',
}

export const mockedUser = {
	id: 'qualquerId',
	name: 'Gustavo',
	email: 'gustavo@fakemail.com',
	password: '123456',
	documentId: '6457985491',
	address: mockedAddress,
}

export const mockedUserReceiver = {
	id: 'qualquerId2',
	name: 'Marco',
	email: 'marco@fakemail.com',
	password: '123456',
	documentId: '00011122234',
	address: mockedAddress2,
}

export const mockedInvalidTransferId = {
	id: '',
	name: 'Marco',
	email: 'marco@fakemail.com',
	password: '123456',
	documentId: '22211100034',
	address: mockedAddress2,
}

export const mockedUserLogin = {
	email: 'gustavo@fakemail.com',
	password: '123456',
}

export const transactionType = {
	withdraw: 'wd',
	deposit: 'dp',
	transfer: 'tf',
}

export const mockedTransactionDeposit: IDepositTransaction = {
	amount: 500,
	receiverWalletId: 'GustavoId',
	documentId: 'MarcoId',
}
export const mockedTransactionDeposit2: IDepositTransaction = {
	amount: 100,
	receiverWalletId: 'GustavoId',
	documentId: 'MarcoId',
}

export const mockedInvalidTransactionDeposit: IDepositTransaction = {
	amount: 0,
	receiverWalletId: 'GustavoId',
	documentId: 'MarcoId',
}

export const mockedTransactionTransfer: ITransferTransaction = {
	amount: 250,
	receiverDocumentId: 'GustavoId',
	senderDocumentId: '22211100034',
	senderWalletId: 'MarcoId',
}

export const mockedInvalidTransactionTransfer: ITransferTransaction = {
	amount: 0,
	receiverDocumentId: 'GustavoId',
	senderDocumentId: '22211100034',
	senderWalletId: 'MarcoId',
}

export const mockedTransactionWithdraw: IWithdrawTransaction = {
	amount: 250,
	receiverWalletId: 'GustavoId',
	documentId: 'MarcoId',
}

export const mockedInvalidTransactionWithdraw: IWithdrawTransaction = {
	amount: 0,
	receiverWalletId: 'GustavoId',
	documentId: 'MarcoId',
}
