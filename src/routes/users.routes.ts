import { Router } from "express";
import {
  createUserController,
  getCurrentUserController,
} from "../controllers/users.controllers";
import ensureAuthMiddleware from "../middleware/ensureAuth.middleware";
import { validateSchemaMiddleware } from "../middleware/validateSchema.middleware";
import { newUserSchema } from "../schemas/createUser.schema";

const usersRoutes = Router();

// usersRoutes.get("/:id", ensureAuthMiddleware, getCurrentUserController);
// ja existe um service/rota/controller proprios ja criados --profile-routes
usersRoutes.post(
  "",
  validateSchemaMiddleware(newUserSchema),
  createUserController
);

export default usersRoutes;
