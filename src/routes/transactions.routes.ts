import { Router } from 'express'
import createTransactionsController from '../controllers/transactions.controller'
import ensureAuthMiddleware from '../middleware/ensureAuth.middleware'

const transactionRoutes = Router()

transactionRoutes.post('', ensureAuthMiddleware, createTransactionsController)

export default transactionRoutes
