import AppDataSource from '../../data-source'
import TransactionCategories from '../../entities/transactionCategories.entity'
import Transaction from '../../entities/transactions.entity'
import Users from '../../entities/users.entity'
import Wallets from '../../entities/wallets.entity'
import { AppError } from '../../errors/AppError'
import { ITransferTransaction } from '../../interfaces/transactions'

const transactionRepository = AppDataSource.getRepository(Transaction)
const walletRepository = AppDataSource.getRepository(Wallets)
const userRepository = AppDataSource.getRepository(Users)
const categoryRepository = AppDataSource.getRepository(TransactionCategories)

export const transferTransactionService = async ({
	amount,
	receiverDocumentId,
	senderWalletId,
	senderDocumentId,
}: ITransferTransaction) => {
	const receiver = await userRepository.findOneBy({
		documentId: receiverDocumentId,
	})

	const senderWallet = await walletRepository.findOneBy({ id: senderWalletId })

	const sender = await userRepository.findOneBy({ documentId: senderDocumentId })

	const transactionType = await categoryRepository.findOneBy({ type: 'tf' })

	if (!senderWallet || !sender || !receiver || !transactionType) {
		throw new AppError('Wallet or user not found', 404)
	}

	if (senderWallet.id !== sender.wallet.id) {
		throw new AppError('The wallet does not belong to this user', 403)
	}

	if (amount < 1) {
		throw new AppError('Amount not allowed', 403)
	}

	if (senderWallet.amount < amount) {
		throw new AppError(
			'User does not have the money to perform the transaction',
			403
		)
	}

	const date = new Date().toDateString()
	const hour = new Date().toLocaleTimeString()

	const transaction = {
		amount,
		senderWalletId,
		senderDocumentId,
		categoryType: transactionType,
	}

	let transfer = transactionRepository.create({
		...transaction,
		date: date,
		hour: hour,
	})

	transfer = await transactionRepository.save(transfer)

	senderWallet.amount -= amount

	receiver.wallet.amount += amount

	await walletRepository.update(
		{
			id: senderWallet.id,
		},
		senderWallet
	)
	await walletRepository.update(
		{
			id: receiver.wallet.id,
		},
		receiver.wallet
	)

	return transfer
}