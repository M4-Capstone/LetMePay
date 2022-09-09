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
	documentId: '11122233344',
	address: mockedAddress,
}

export const mockedUserReceiver = {
	id: 'qualquerId2',
	name: 'Marco',
	email: 'marco@fakemail.com',
	password: '123456',
	documentId: '00011122233',
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
	receiverWalletId: 'gustavoWalletId',
	documentId: '00011122233',
}
export const mockedTransactionDeposit2: IDepositTransaction = {
	amount: 100,
	receiverWalletId: 'gustavoWalletId',
	documentId: '00011122233',
}

export const mockedInvalidTransactionDeposit: IDepositTransaction = {
	amount: 0,
	receiverWalletId: 'gustavoWalletId',
	documentId: '00011122233',
}

export const mockedInvalidTransactionDepositByReceiver: IDepositTransaction = {
	amount: 250,
	receiverWalletId: 'gustavoWalletId',
	documentId: '00000000002',
}

export const mockedTransactionWithdraw: IWithdrawTransaction = {
	amount: 250,
	receiverWalletId: 'gustavoWalletId',
	documentId: '11122233344',
}

export const mockedInvalidTransactionWithdraw: IWithdrawTransaction = {
	amount: 0,
	receiverWalletId: 'gustavoWalletId',
	documentId: '11122233344',
}

export const mockedInvalidTransactionWithdrawByReceiver: IWithdrawTransaction =
	{
		amount: 0,
		receiverWalletId: 'gustavoWalletId',
		documentId: '00000000002',
	}

export const mockedTransactionTransfer: ITransferTransaction = {
	amount: 250,
	receiverDocumentId: '11122233344',
	senderDocumentId: '22211100034',
	senderWalletId: 'senderWalletId',
}

export const mockedInvalidTransactionTransferByAmount: ITransferTransaction = {
	amount: 0,
	receiverDocumentId: '22211100034',
	senderDocumentId: '11122233344',
	senderWalletId: 'senderWalletId',
}

export const mockedInvalidTransactionTransferBySender: ITransferTransaction = {
	amount: 0,
	receiverDocumentId: '22211100034',
	senderDocumentId: '00000000002',
	senderWalletId: 'senderWalletId',
}

export const mockedInvalidTransactionTransferByReceiver: ITransferTransaction =
	{
		amount: 0,
		receiverDocumentId: '00000000001',
		senderDocumentId: '11122233344',
		senderWalletId: 'senderWalletId',
	}
