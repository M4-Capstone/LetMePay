import AppDataSource from "../../data-source";
import TransactionCategories from "../../entities/transactionCategories.entity";
import Transaction from "../../entities/transactions.entity";
import Users from "../../entities/users.entity";
import Wallets from "../../entities/wallets.entity";
import { AppError } from "../../errors/AppError";
import { IDepositTransaction } from "../../interfaces/transactions";
import sendReceiptToClientEmail from "../../utils/emailManager/convertToPdfAndSend";
import "dotenv/config";

const transactionRepository = AppDataSource.getRepository(Transaction);
const walletRepository = AppDataSource.getRepository(Wallets);
const userRepository = AppDataSource.getRepository(Users);
const categoryRepository = AppDataSource.getRepository(TransactionCategories);

export const depositTransactionService = async (
  { amount, documentId }: IDepositTransaction,
  receiverId: string
) => {
  const receiver = await userRepository.findOneBy({ documentId: receiverId });
  const transactionType = await categoryRepository.findOneBy({ type: "dp" });
  const receiverWallet = await walletRepository.findOneBy({
    id: receiver?.wallet.id,
  });

  if (!receiver || !receiverWallet || !transactionType) {
    throw new AppError("Wallet or user not found", 404);
  }

  if (receiver.documentId !== documentId) {
    throw new AppError("The wallet does not belong to this user", 403);
  }

  if (amount < 1) {
    throw new AppError("Amount not allowed", 400);
  }

  const date = new Date().toDateString();
  const hour = new Date().toLocaleTimeString();

  const transaction = {
    amount,
    categoryType: transactionType,
    receiverWallet: receiverWallet,
  };

  let deposit = transactionRepository.create({
    ...transaction,
    date: date,
    hour: hour,
    receiverId: receiver,
    senderId:receiver
  });

  deposit = await transactionRepository.save(deposit);

  receiverWallet.amount = +receiverWallet.amount + amount;

  await walletRepository.update(
    {
      id: receiverWallet.id,
    },
    receiverWallet
  );
  const receiptData = {
    ...deposit,
    amount: deposit.amount.toFixed(2),
    receiver: {
      name: receiver.name,
    },
  };

  process.env.NODE_ENV !== "test"
    ? await sendReceiptToClientEmail(
        "deposit",
        receiptData,
        receiver.email,
        receiver.name
      )
    : null;

  return deposit;
};
