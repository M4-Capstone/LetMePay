import { Router } from "express";
import {
  getCurrentUserController,
  getUserKeywordController,
} from "../controllers/users.controllers";
import ensureAuthMiddleware from "../middleware/ensureAuth.middleware";

const routes = Router();

routes.get("", ensureAuthMiddleware, getCurrentUserController);
routes.get("/:keyword",getUserKeywordController)

export default routes;
