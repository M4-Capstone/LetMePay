import { Router } from 'express'
import { depositTransactionController } from '../controllers/transactions/post/depositTransaction.controller'
import { transferTransactionController } from '../controllers/transactions/post/transferTransaction.controller'
import { withdrawTransactionController } from '../controllers/transactions/post/withdrawTransaction.controller'
import ensureAuthMiddleware from '../middleware/ensureAuth.middleware'

const transactionRoutes = Router()

transactionRoutes.post(
	'/transfer',
	ensureAuthMiddleware,
	transferTransactionController
)
transactionRoutes.post(
	'/deposit',
	ensureAuthMiddleware,
	depositTransactionController
)
transactionRoutes.post(
	'/withdraw',
	ensureAuthMiddleware,
	withdrawTransactionController
)

export default transactionRoutes
