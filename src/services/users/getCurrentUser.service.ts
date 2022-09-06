import AppDataSource from "../../data-source";
import Users from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";

const getCurrentUserService = async (id: string) => {
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

  // const removePassword = (user: Users) => {
  //   const treatedUser = [user];
  //   return treatedUser.map((user) => {
  //     const { password, ...userWithoutPwd } = user;
  //     return userWithoutPwd;
  //   });
  // };

  const { password, ...user } = findUser;

  return user;
};

export default getCurrentUserService;
