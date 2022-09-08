import AppDataSource from '../../data-source'
import TransactionCategories from '../../entities/transactionCategories.entity'
import Transaction from '../../entities/transactions.entity'
import Users from '../../entities/users.entity'
import Wallets from '../../entities/wallets.entity'
import { AppError } from '../../errors/AppError'
import { IDepositTransaction } from '../../interfaces/transactions'

const transactionRepository = AppDataSource.getRepository(Transaction)
const walletRepository = AppDataSource.getRepository(Wallets)
const userRepository = AppDataSource.getRepository(Users)
const categoryRepository = AppDataSource.getRepository(TransactionCategories)

export const depositTransactionService = async ({
	amount,
	receiverWalletId,
	documentId,
}: IDepositTransaction) => {
	const receiver = await walletRepository.findOneBy({ id: receiverWalletId })
	const user = await userRepository.findOneBy({ documentId })
	const transactionType = await categoryRepository.findOneBy({ type: 'dp' })

	if (!user || !receiver || !transactionType) {
		throw new AppError('Wallet or user not found', 404)
	}

	if (user.wallet.id !== receiver.id) {
		throw new AppError('The wallet does not belong to this user', 403)
	}

	if (amount < 1) {
		throw new AppError('Amount not allowed', 400)
	}

	const date = new Date().toDateString()
	const hour = new Date().toLocaleTimeString()

	const transaction = {
		amount,
		receiverWalletId,
		categoryType: transactionType,
	}

	let deposit = transactionRepository.create({
		...transaction,
		date: date,
		hour: hour,
	})

	deposit = await transactionRepository.save(deposit)

	receiver.amount += amount

	await walletRepository.update(
		{
			id: receiver.id,
		},
		receiver
	)

	return deposit
}
