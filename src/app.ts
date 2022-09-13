import "reflect-metadata";
import "express-async-errors";
import transactionRoutes from "./routes/transactions.routes";
import express from "express";
import profileRoutes from "./routes/profile.routes";
import usersRoutes from "./routes/users.routes";
import { handleErrorMiddleware } from "./middleware/handleError.middleware";
import sessionRoutes from "./routes/session.routes";
import categoriesRoutes from "./routes/catogories.routes";
import historyRoutes from "./routes/history.routes";

const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", usersRoutes);
app.use("/login", sessionRoutes);
app.use("/profile", profileRoutes);
app.use("/transactions", transactionRoutes);
app.use("/categories", categoriesRoutes);
app.use("/history", historyRoutes);

app.use(handleErrorMiddleware);

export default app;
