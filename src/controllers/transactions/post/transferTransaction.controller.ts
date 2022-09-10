import { Request, Response } from 'express'

import { transferTransactionService } from '../../../services/transactions/transferTransaction.service'

export const transferTransactionController = async (
	req: Request,
	res: Response
) => {
	const { amount, receiverDocumentId, senderWalletId, senderDocumentId } =
		req.body

	await transferTransactionService({
		amount,
		receiverDocumentId,
		senderWalletId,
		senderDocumentId,
	})
	return res.json({
		message: ' Transfer transaction successfully created',
		status: 'Receipt sent to customers email',
	})
}
