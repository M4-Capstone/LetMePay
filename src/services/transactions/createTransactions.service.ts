import AppDataSource from '../../data-source'
import Transaction from '../../entities/transactions.entity'
import TransactionCategories from '../../entities/transactionCategories.entity'
import { ITransaction } from '../../interfaces/transactions'

const transactionRepository = AppDataSource.getRepository(Transaction)
const categoryRepository = AppDataSource.getRepository(TransactionCategories)

export const createTransactionsService = async ({
	amount,
	categoryTypeId,
	receiverWalletId,
	senderWalletId,
}: ITransaction) => {
	const date = new Date().toDateString()
	const hour = new Date().toLocaleTimeString()

	const categorySelected = categoryRepository.findOne({
		// id: categoryTypeId,
	})

	// let transaction = transactionRepository.create({
	// 	amount,
	// 	date: date,
	// 	hour: hour,
	// 	categoryId: categorySelected,
	// 	// receiverWalletId: receiverWalletId,
	// 	// senderWalletId: senderWalletId,
	// })
}
