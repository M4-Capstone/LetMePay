import { Request, Response } from 'express'
import { ITransaction } from '../interfaces/transactions'

export const createTransactionsService = async (
	req: Request,
	res: Response
) => {
	const {
		amount,
		categoryTypeId,
		receiverWalletId,
		senderWalletId,
	}: ITransaction = req.body

	// const transaction = await createTransactionsService({
	// 	amount,
	// 	categoryTypeId,
	// 	receiverWalletId,
	// 	senderWalletId,
	// })

	return res.status(201).json()
}
