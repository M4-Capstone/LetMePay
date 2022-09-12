import { Router } from "express";
import { createSessionController } from "../controllers/sessions.controller";
import { validateSchemaMiddleware } from "../middleware/validateSchema.middleware";
import { sessionSchema } from "../schemas/session.schema";
import { userIsActiveMiddleware } from "../middleware/isActive.middleware";

const sessionRoutes = Router();

sessionRoutes.post(
  "",
  validateSchemaMiddleware(sessionSchema),
  createSessionController
);

export default sessionRoutes;
