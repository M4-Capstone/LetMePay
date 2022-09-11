import { Router } from "express";
import { depositTransactionController } from "../controllers/transactions/post/depositTransaction.controller";
import { transferTransactionController } from "../controllers/transactions/post/transferTransaction.controller";
import { withdrawTransactionController } from "../controllers/transactions/post/withdrawTransaction.controller";
import ensureAuthMiddleware from "../middleware/ensureAuth.middleware";
import { validateSchemaMiddleware } from "../middleware/validateSchema.middleware";

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
  transferTransactionController
);
transactionRoutes.post(
  "/deposit",
  ensureAuthMiddleware,
  validateSchemaMiddleware(depositSchema),
  depositTransactionController
);
transactionRoutes.post(
  "/withdraw",
  ensureAuthMiddleware,
  validateSchemaMiddleware(withdrawSchema),
  withdrawTransactionController
);

export default transactionRoutes;
