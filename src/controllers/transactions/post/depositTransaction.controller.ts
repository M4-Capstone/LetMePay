import { Request, Response } from 'express'
import { depositTransactionService } from '../../../services/transactions/depositTransaction.service'

export const depositTransactionController = async (
	req: Request,
	res: Response
) => {
	const { amount, receiverWalletId, documentId } = req.body
	console.log(req.body,'iassa')
	await depositTransactionService({
		amount,
		receiverWalletId,
		documentId,
	})

	return res.json({
		message: 'Transaction successfully created',
		status: 'Receipt sent to customers email',
	})
}
