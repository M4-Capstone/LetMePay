
import transactionRoutes from './routes/transactions.routes'
import express from "express";
import profileRoutes from "./routes/profile.routes";
import usersRoutes from "./routes/users.routes";
import { handleErrorMiddleware } from "./middleware/handleError.middleware";
import sessionRoutes from "./routes/session.routes";

const app = express()
app.use(express.json())

app.use('/transactions:type', transactionRoutes)
app.use("/profile", profileRoutes);
app.use("/users", usersRoutes);
app.use("/login", sessionRoutes);

app.use(handleErrorMiddleware)

export default app
