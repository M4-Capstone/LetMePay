import { Request, Response } from "express";
import getHistoryService from "../services/histories/getHistory.service";
import getHistoryByTypeService from "../services/histories/getHistoryByType.service";
import getTransactionService from "../services/histories/getTransaction.service";
import { TransactionTypes } from "../interfaces/histories";

const getHistoryController = async (req: Request, res: Response) => {
  const { period, startDate, endDate } = req.query as Record<
    string,
    string | undefined
  >;
  const userId = req.user.id;

  const history = await getHistoryService(userId, {
    period,
    startDate,
    endDate,
  });

  return res.json(history);
};

const getTransactionController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const transaction = await getTransactionService(id);
  return res.json(transaction);
};

const getHistoryByTypeController = async (req: Request, res: Response) => {
  const { period, startDate, endDate } = req.query as Record<
    string,
    string | undefined
  >;
  const userId = req.user.id;
  const { type } = req.params;

  const history = await getHistoryByTypeService(
    userId,
    type as TransactionTypes,
    {
      period,
      startDate,
      endDate,
    }
  );

  return res.json(history);
};

export {
  getHistoryController,
  getTransactionController,
  getHistoryByTypeController,
};
