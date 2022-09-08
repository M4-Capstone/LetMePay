import { ITransaction } from '../../interfaces/transactions'

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
	documentId: '6457985492',
	address: mockedAddress2,
}

export const mockedInvalidTransferId = {
	id: '',
	name: 'Marco',
	email: 'marco@fakemail.com',
	password: '123456',
	documentId: '6457985492',
	address: mockedAddress2,
}

export const mockedUserLogin = {
	email: 'gustavo@fakemail.com',
	password: '123456',
}

export const transactionType = {
	withdraw: 'wd',
	deposit: 'dp',
	transfer: 'tr',
}

export const mockedTransactionDeposit: ITransaction = {
	amount: 500,
	categoryTypeId: transactionType.deposit,
	receiverWalletId: 'GustavoId',
	senderWalletId: 'MarcoId',
}
export const mockedTransactionDeposit2: ITransaction = {
	amount: 100,
	categoryTypeId: transactionType.deposit,
	receiverWalletId: 'GustavoId',
	senderWalletId: 'MarcoId',
}

export const mockedInvalidTransactionDeposit: ITransaction = {
	amount: 0,
	categoryTypeId: transactionType.deposit,
	receiverWalletId: 'GustavoId',
	senderWalletId: 'MarcoId',
}

export const mockedTransactionTransfer: ITransaction = {
	amount: 250,
	categoryTypeId: transactionType.transfer,
	receiverWalletId: 'GustavoId',
	senderWalletId: 'MarcoId',
}

export const mockedInvalidTransactionTransfer: ITransaction = {
	amount: 0,
	categoryTypeId: transactionType.deposit,
	receiverWalletId: 'GustavoId',
	senderWalletId: 'MarcoId',
}

export const mockedTransactionWithdraw: ITransaction = {
	amount: 250,
	categoryTypeId: transactionType.withdraw,
	receiverWalletId: 'GustavoId',
	senderWalletId: 'MarcoId',
}

export const mockedInvalidTransactionWithdraw: ITransaction = {
	amount: 0,
	categoryTypeId: transactionType.deposit,
	receiverWalletId: 'GustavoId',
	senderWalletId: 'MarcoId',
}
