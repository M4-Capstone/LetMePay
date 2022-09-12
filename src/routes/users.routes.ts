import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getCurrentUserController,
  updateUserController,
} from "../controllers/users.controllers";
import ensureAuthMiddleware from "../middleware/ensureAuth.middleware";
import { validateSchemaMiddleware } from "../middleware/validateSchema.middleware";
import { newUserSchema, updateUserSchema } from "../schemas/user.schema";
import { userIsActiveMiddleware } from "../middleware/isActive.middleware";

const usersRoutes = Router();

usersRoutes.post(
  "",
  validateSchemaMiddleware(newUserSchema),
  createUserController
);

usersRoutes.patch(
  "",
  ensureAuthMiddleware,
  userIsActiveMiddleware,
  validateSchemaMiddleware(updateUserSchema),
  updateUserController
);
usersRoutes.delete(
  "",
  ensureAuthMiddleware,
  userIsActiveMiddleware,
  deleteUserController
);

export default usersRoutes;
