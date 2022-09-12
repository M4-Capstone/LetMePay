import { LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import AppDataSource from "../../data-source";
import Transaction from "../../entities/transactions.entity";
import Users from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";
import { type TGetHistoryByType } from "../../interfaces/histories";
import DateUtils from "../../utils/DateUtils";

const getHistoryByTypeService: TGetHistoryByType = async (
  id,
  type,
  { period, startDate, endDate }
) => {
  const historyRepo = AppDataSource.getRepository(Transaction);
  const userRepo = AppDataSource.getRepository(Users);

  const userWallet = (await userRepo.findOneBy({ documentId: id }))?.wallet;
  if (!userWallet) throw new AppError("Wallet not found", 500);

  if (period) {
    const date = DateUtils.periodToDateString(period);
    const history = await historyRepo.find({
      where: [
        {
          date: MoreThanOrEqual(date),
          senderWallet: {
            id: userWallet.id,
          },
          categoryType: {
            type,
          },
        },
        {
          date: MoreThanOrEqual(date),
          receiverWallet: {
            id: userWallet.id,
          },
          categoryType: {
            type,
          },
        },
      ],
      relations: {
        senderWallet: true,
        receiverWallet: true,
      },
    });

    return history;
  } else if (startDate || endDate) {
    let comparison;
    if (startDate && endDate)
      comparison = MoreThanOrEqual(startDate) && LessThanOrEqual(endDate);
    else if (startDate) comparison = MoreThanOrEqual(startDate);
    else if (endDate) comparison = LessThanOrEqual(endDate);

    const history = await historyRepo.find({
      where: [
        {
          date: comparison,
          senderWallet: {
            id: userWallet.id,
          },
          categoryType: {
            type,
          },
        },
        {
          date: comparison,
          receiverWallet: {
            id: userWallet.id,
          },
          categoryType: {
            type,
          },
        },
      ],
      relations: {
        senderWallet: true,
        receiverWallet: true,
      },
    });

    return history;
  }

  return await historyRepo.find({
    where: [
      {
        receiverWallet: {
          id: userWallet.id,
        },
        categoryType: {
          type,
        },
      },
      {
        senderWallet: {
          id: userWallet.id,
        },
        categoryType: {
          type,
        },
      },
    ],
    relations: {
      senderWallet: true,
      receiverWallet: true,
    },
  });
};

export default getHistoryByTypeService;
