import { Request, Response } from 'express'
import { withdrawTransactionService } from '../../../services/transactions/withdrawTransaction.service'

export const withdrawTransactionController = async (
	req: Request,
	res: Response
) => {
	const { amount, documentId } = req.body
	const receiverId = req.user.id
	await withdrawTransactionService({
		amount,
		documentId
	},receiverId)
	return res.json({
		message: 'Withdraw transaction successfully created',
		status: 'Receipt sent to customers email',
	})
}
