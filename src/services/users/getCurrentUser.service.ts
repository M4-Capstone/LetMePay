import AppDataSource from "../../data-source";
import Users from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";

const getCurrentUserService = async (id: string): Promise<Users> => {
  const userRepository = AppDataSource.getRepository(Users);

  const findUser = await userRepository.findOneBy({
    documentId: id,
  });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  if (!findUser?.isActive) {
    throw new AppError("User inactive", 404);
  }

  return findUser;
};

export default getCurrentUserService;
