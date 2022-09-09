import AppDataSource from "../../data-source";
import TransactionCategories from "../../entities/transactionCategories.entity";
import { AppError } from "../../errors/AppError";

const getAllCategoriesService = async (): Promise<TransactionCategories[]> => {
  const transactionRepository = AppDataSource.getRepository(
    TransactionCategories
  );
  const res = transactionRepository.find();
  if (!res) {
    throw new AppError("invalid search");
  }
  return res;
};

export default getAllCategoriesService;
