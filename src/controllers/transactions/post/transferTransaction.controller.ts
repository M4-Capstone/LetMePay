import { Request, Response } from "express";

import { transferTransactionService } from "../../../services/transactions/transferTransaction.service";

export const transferTransactionController = async (
  req: Request,
  res: Response
) => {
  const { amount, receiverDocumentId, senderDocumentId } = req.body;
  const senderId = req.user.id;
  await transferTransactionService(
    {
      amount,
      receiverDocumentId,
      senderDocumentId,
    },
    senderId
  );
  return res.json({
    message: "Transfer transaction successfully created",
    status: "Receipt sent to customers email",
  });
};
