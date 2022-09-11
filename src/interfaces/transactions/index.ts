export interface IDepositTransaction {
	amount: number
	receiverWalletId: string
	documentId: string
}

export interface IWithdrawTransaction {
	amount: number
	receiverWalletId: string
	documentId: string
}

export interface ITransferTransaction {
	amount: number
	receiverDocumentId: string
	senderWalletId: string
	senderDocumentId: string
}


