import AppDataSource from '../../data-source'
import Transaction from '../../entities/transactions.entity'
import { ITransaction } from '../../interfaces/transactions'

const transactionRepository = AppDataSource.getRepository(Transaction)

export const createTransactionsService = async (request: ITransaction) => {
	const date = new Date().toDateString()
	const hour = new Date().toLocaleTimeString()

	let transaction = transactionRepository.create({
		...request,
		date: date,
		hour: hour,
	})
	return transaction
}
