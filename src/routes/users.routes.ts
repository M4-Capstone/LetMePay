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

const usersRoutes = Router();

// usersRoutes.get("/:id", ensureAuthMiddleware, getCurrentUserController);
// ja existe um service/rota/controller proprios ja criados --profile-routes
usersRoutes.post(
  "",
  validateSchemaMiddleware(newUserSchema),
  createUserController
);

usersRoutes.patch("", ensureAuthMiddleware, validateSchemaMiddleware(updateUserSchema), updateUserController);
usersRoutes.delete("", ensureAuthMiddleware, deleteUserController);

export default usersRoutes;
