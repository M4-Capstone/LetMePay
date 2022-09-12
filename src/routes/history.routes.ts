import { Router } from "express";
import {
  getHistoryByTypeController,
  getHistoryController,
  getTransactionController,
} from "../controllers/histories.controllers";
import ensureAuthMiddleware from "../middleware/ensureAuth.middleware";

const historyRoutes = Router();

historyRoutes.get("", ensureAuthMiddleware, getHistoryController); // period comes as query params
historyRoutes.get("/:type", ensureAuthMiddleware, getHistoryByTypeController);
historyRoutes.get(
  "/transaction/:id",
  ensureAuthMiddleware,
  getTransactionController
);

export default historyRoutes;
