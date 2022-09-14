import AppDataSource from "../../data-source";
import Transaction from "../../entities/transactions.entity";
import { AppError } from "../../errors/AppError";

const getTransactionService = async (id: string): Promise<Transaction> => {
  const historyRepo = AppDataSource.getRepository(Transaction);

  const transaction = await historyRepo.findOne({
    select: {
      receiverId: {
        name: true,
        email: true,
        documentId: true,
      },
      senderId: {
        name: true,
        email: true,
        documentId: true,
      },
    },
    where: { id },
    relations: { receiverId: true, senderId: true },
    order: {
      date: "DESC",
      hour: "DESC",
    },
  });
  if (!transaction)
    throw new AppError("There is no transaction made with this id", 404);

  return transaction;
};

export default getTransactionService;
