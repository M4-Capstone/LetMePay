import { Router } from "express";
import { getCurrentUserController } from "../controllers/users.controllers";
import ensureAuthMiddleware from "../middleware/ensureAuth.middleware";

const routes = Router();

routes.get("", ensureAuthMiddleware, getCurrentUserController);

export default routes;
