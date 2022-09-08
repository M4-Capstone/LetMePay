import { Router } from "express";
import {
  createUserController,
  getCurrentUserController,
} from "../controllers/users.controllers";
import ensureAuthMiddleware from "../middleware/ensureAuth.middleware";

const usersRoutes = Router();

usersRoutes.get("/:id", ensureAuthMiddleware, getCurrentUserController);
usersRoutes.post("", createUserController);

export default usersRoutes;
