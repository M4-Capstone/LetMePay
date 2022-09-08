import express from 'express'
import profileRoutes from './routes/profile.routes'
import { handleErrorMiddleware } from './middleware/handleError.middleware'
import transactionRoutes from './routes/transactions.routes'

const app = express()
app.use(express.json())

app.use('/profile', profileRoutes)
app.use('/transactions:type', transactionRoutes)

app.use(handleErrorMiddleware)

export default app
