import { Router } from "express";

import ensureAuthMiddleware from "../middleware/ensureAuth.middleware";
import {
  getAllCategoriesController,
  createCategoryController,
} from "../controllers/categories.controller";

import { userIsActiveMiddleware } from "../middleware/isActive.middleware";

const categoriesRoutes = Router();

categoriesRoutes.post(
  "",
  ensureAuthMiddleware,
  userIsActiveMiddleware,
  createCategoryController
);
categoriesRoutes.get(
  "",
  ensureAuthMiddleware,
  userIsActiveMiddleware,
  getAllCategoriesController
);

export default categoriesRoutes;
