import { Request, Response } from 'express'
import { createTransactionsService } from '../services/transactions/createTransactions.service'

export const createTransactionsController = async (
	req: Request,
	res: Response
) => {
	const transaction = await createTransactionsService(req.body)
	return res.json(transaction)
}

export default createTransactionsController
