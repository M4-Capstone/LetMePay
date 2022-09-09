import { Request, Response } from 'express'
import { withdrawTransactionService } from '../../../services/transactions/withdrawTransaction.service'

export const withdrawTransactionController = async (
	req: Request,
	res: Response
) => {
	const { amount, receiverWalletId, documentId } = req.body

	await withdrawTransactionService({
		amount,
		receiverWalletId,
		documentId,
	})
	return res.json({
		message: 'Transaction successfully created',
		status: 'Receipt sent to customers email',
	})
}
