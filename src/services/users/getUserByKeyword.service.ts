import AppDataSource from "../../data-source";
import Users from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";

const getUserbyKeywordService = async (keyword: string) => {
  const userRepository = AppDataSource.getRepository(Users);

  const user = await userRepository.find({
    where: [{ documentId: keyword }, { name: keyword }, { email: keyword }],
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

export default getUserbyKeywordService;
