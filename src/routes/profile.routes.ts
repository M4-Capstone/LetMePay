import { Router } from "express";
import {
  getCurrentUserController,
  getUserKeywordController,
} from "../controllers/users.controllers";
import ensureAuthMiddleware from "../middleware/ensureAuth.middleware";
import { userIsActiveMiddleware } from "../middleware/isActive.middleware";

const routes = Router();

routes.get(
  "",
  ensureAuthMiddleware,
  userIsActiveMiddleware,
  getCurrentUserController
);
routes.get(
  "/:keyword",
  ensureAuthMiddleware,
  userIsActiveMiddleware,
  getUserKeywordController
);

export default routes;
