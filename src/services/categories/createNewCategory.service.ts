import AppDataSource from "../../data-source";
import TransactionCategories from "../../entities/transactionCategories.entity";
import { AppError } from "../../errors/AppError";

const accepted: string[] = ["dp", "tf", "wd"];

const createNewCategoryService = async (
  type: string
): Promise<TransactionCategories> => {
  if (!type || !accepted.includes(type)) {
    throw new AppError("invalid parameters for category insertion");
  }

  const categoryRepository = AppDataSource.getRepository(TransactionCategories);
  const categoryAlreadyExists = await categoryRepository.findOne({
    where: { type },
  });
  if (categoryAlreadyExists) {
    throw new AppError("category already exists", 409);
  }

  const res = await categoryRepository.save({ type });
  return res;
};

export default createNewCategoryService;
