import express from "express";
import profileRoutes from "./routes/profile.routes";
import usersRoutes from "./routes/users.routes";
import { handleErrorMiddleware } from "./middleware/handleError.middleware";

const app = express();
app.use(express.json());

app.use("/profile", profileRoutes);
app.use("/users", usersRoutes);

app.use(handleErrorMiddleware);

export default app;
