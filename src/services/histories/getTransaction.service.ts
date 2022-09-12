import AppDataSource from "../../data-source";
import Transaction from "../../entities/transactions.entity";
import { AppError } from "../../errors/AppError";

const getTransactionService = async (id: string): Promise<Transaction> => {
  const historyRepo = AppDataSource.getRepository(Transaction);

  const transaction = await historyRepo.findOne({
    where: { id },
    relations: { receiverWallet: true, senderWallet: true },
  });
  if (!transaction)
    throw new AppError("There is no transaction made with this id", 404);

  return transaction;
};

export default getTransactionService;
