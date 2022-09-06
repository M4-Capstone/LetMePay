import AppDataSource from "../../data-source";
import Users from "../../entities/users.entity";

const getCurrentUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(Users);

  const findUser = await userRepository.findOneBy({
    documentId: id,
  });

  if (!findUser) {
    throw new Error("User not found");
  }

  if (!findUser?.isActive) {
    throw new Error("User inactive");
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
