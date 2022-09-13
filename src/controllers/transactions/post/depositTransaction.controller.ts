import { Request, Response } from "express";
import { depositTransactionService } from "../../../services/transactions/depositTransaction.service";

export const depositTransactionController = async (
  req: Request,
  res: Response
) => {
  const { amount, documentId } = req.body;
  const receiverId = req.user.id;

  await depositTransactionService({ amount, documentId }, receiverId);

  return res.json({
    message: "Deposit transaction successfully created",
    status: "Receipt sent to customers email",
  });
};
