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
      where: [
        {
          date: MoreThanOrEqual(date),
          categoryType: {
            type,
          },
          senderId: {
            documentId: id,
          },
        },
        {
          date: MoreThanOrEqual(date),
          categoryType: {
            type,
          },
          receiverId: {
            documentId: id,
          },
        },
      ],
      relations: {
        senderId: true,
        receiverId: true,
      },
      order: {
        date: "DESC",
        hour: "DESC",
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
      where: [
        {
          date: comparison,
          categoryType: {
            type,
          },
          senderId: {
            documentId: id,
          },
        },
        {
          date: comparison,
          categoryType: {
            type,
          },
          receiverId: {
            documentId: id,
          },
        },
      ],
      relations: {
        senderId: true,
        receiverId: true,
      },
      order: {
        date: "DESC",
        hour: "DESC",
      },
    });

    return history;
  }

  return await historyRepo.find({
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
    where: [
      {
        categoryType: {
          type,
        },
        senderId: {
          documentId: id,
        },
      },
      {
        categoryType: {
          type,
        },
        receiverId: {
          documentId: id,
        },
      },
    ],
    relations: {
      senderId: true,
      receiverId: true,
    },
    order: {
      date: "DESC",
      hour: "DESC",
    },
  });
};

export default getHistoryByTypeService;
