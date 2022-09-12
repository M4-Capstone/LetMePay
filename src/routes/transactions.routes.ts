import { Router } from "express";
import { depositTransactionController } from "../controllers/transactions/post/depositTransaction.controller";
import { transferTransactionController } from "../controllers/transactions/post/transferTransaction.controller";
import { withdrawTransactionController } from "../controllers/transactions/post/withdrawTransaction.controller";
import ensureAuthMiddleware from "../middleware/ensureAuth.middleware";
import { validateSchemaMiddleware } from "../middleware/validateSchema.middleware";
import { userIsActiveMiddleware } from "../middleware/isActive.middleware";

import {
  depositSchema,
  withdrawSchema,
  transferSchema,
} from "../schemas/transactions.schema";

const transactionRoutes = Router();

transactionRoutes.post(
  "/transfer",
  ensureAuthMiddleware,
  validateSchemaMiddleware(transferSchema),
  userIsActiveMiddleware,
  transferTransactionController
);
transactionRoutes.post(
  "/deposit",
  ensureAuthMiddleware,
  validateSchemaMiddleware(depositSchema),
  userIsActiveMiddleware,
  depositTransactionController
);
transactionRoutes.post(
  "/withdraw",
  ensureAuthMiddleware,
  validateSchemaMiddleware(withdrawSchema),
  userIsActiveMiddleware,
  withdrawTransactionController
);

export default transactionRoutes;
