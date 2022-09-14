import { LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import AppDataSource from "../../data-source";
import Transaction from "../../entities/transactions.entity";
import Users from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";
import { TGetHistory } from "../../interfaces/histories";
import DateUtils from "../../utils/DateUtils";
const getHistoryService: TGetHistory = async (
  id,
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
        },
        {
          date: MoreThanOrEqual(date),
          receiverWallet: {
            id: userWallet.id,
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
        },
        {
          date: comparison,
          receiverWallet: {
            id: userWallet.id,
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
    select:{
       receiverId:{
        name:true,
        email:true,
        documentId:true,
        
       },
       senderId:{
        name:true,
        email:true,
        documentId:true,
       },
       
    },
    relations:{
      receiverId:true,
      senderId:true
    },
    order: {
      date:"DESC",
      hour:"DESC"
    }
  })

};

export default getHistoryService;
