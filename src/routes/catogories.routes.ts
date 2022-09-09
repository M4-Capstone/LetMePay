import { Router } from "express";

import ensureAuthMiddleware from "../middleware/ensureAuth.middleware";
import {
  getAllCategoriesController,
  createCategoryController,
} from "../controllers/categories.controller";

const categoriesRoutes = Router();

categoriesRoutes.post("", ensureAuthMiddleware, createCategoryController);
categoriesRoutes.get("", ensureAuthMiddleware, getAllCategoriesController);

export default categoriesRoutes;
