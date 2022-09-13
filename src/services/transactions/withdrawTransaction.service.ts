import AppDataSource from "../../data-source";
import TransactionCategories from "../../entities/transactionCategories.entity";
import Transaction from "../../entities/transactions.entity";
import Users from "../../entities/users.entity";
import Wallets from "../../entities/wallets.entity";
import { AppError } from "../../errors/AppError";
import { IWithdrawTransaction } from "../../interfaces/transactions";
import sendReceiptToClientEmail from "../../utils/emailManager/convertToPdfAndSend";

const transactionRepository = AppDataSource.getRepository(Transaction);
const walletRepository = AppDataSource.getRepository(Wallets);
const userRepository = AppDataSource.getRepository(Users);
const categoryRepository = AppDataSource.getRepository(TransactionCategories);

export const withdrawTransactionService = async (
  { amount, documentId }: IWithdrawTransaction,
  receiverId: string
) => {
  const receiver = await userRepository.findOneBy({ documentId: receiverId });

  const receiverWallet = await walletRepository.findOneBy({
    id: receiver?.wallet.id,
  });

  const transactionType = await categoryRepository.findOneBy({ type: "wd" });

  if (!receiver || !receiverWallet || !transactionType) {
    throw new AppError("Wallet or user not found", 404);
  }

  if (documentId !== receiver.documentId) {
    throw new AppError("The wallet does not belong to this user", 403);
  }

  if (amount < 1) {
    throw new AppError("Amount not allowed", 400);
  }

  if (receiverWallet.amount < amount) {
    throw new AppError(
      "User does not have the money to perform the transaction",
      403
    );
  }

  const date = new Date().toDateString();
  const hour = new Date().toLocaleTimeString();

  const transaction = {
    amount,
    categoryType: transactionType,
    receiverWallet: receiverWallet,
  };

  let withdraw = transactionRepository.create({
    ...transaction,
    date: date,
    hour: hour,
  });

  withdraw = await transactionRepository.save(withdraw);

  receiverWallet.amount = +receiverWallet.amount - amount;

  await walletRepository.update(
    {
      id: receiverWallet.id,
    },
    receiverWallet
  );

  const receiptData = {
    ...withdraw,
    amount: withdraw.amount.toFixed(2),
    receiver: {
      name: receiver.name,
    },
  };

  await sendReceiptToClientEmail(
    "withdraw",
    receiptData,
    receiver.email,
    receiver.name
  );

  return withdraw;
};
