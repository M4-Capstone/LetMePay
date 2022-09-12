export interface IDepositTransaction {
	amount: number
	documentId: string
}

export interface IWithdrawTransaction {
	amount: number
	documentId: string
}

export interface ITransferTransaction {
	amount: number
	receiverDocumentId: string
	senderDocumentId: string
}


