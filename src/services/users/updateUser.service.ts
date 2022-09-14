import AppDataSource from "../../data-source";
import Users from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";
import { IUserUpdate } from "../../interfaces/users";
import * as bcrypt from "bcryptjs";
import Addresses from "../../entities/addresses.entity";

export const updateUserService = async (
  id: string,
  { name, email, password, address }: IUserUpdate
): Promise<Users> => {
  const userRepository = AppDataSource.getRepository(Users);
  const addressRepository = AppDataSource.getRepository(Addresses);

  const findUser = await userRepository.findOne({
    where: {
      documentId: id,
    },
    relations: { address: true },
  });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  if (!findUser.isActive) {
    throw new AppError("User not active", 400);
  }

  if (password) {
    if (!bcrypt.compare(findUser.password, password)) {
      throw new AppError("Please enter a different password");
    }

    findUser.password = await bcrypt.hash(password, 10);
  }

  if (address) {
    await addressRepository.update({ id: findUser.address.id }, address);
  }

  await userRepository.update(
    { documentId: id },
    {
      name: name ? name : findUser.name,
      password: findUser.password,
      email: email ? email : findUser.email,
    }
  );

  const findUserUpdated = await userRepository.findOne({
    where: {
      documentId: id,
    },
    relations: {
      address: true,
    },
  });

  return findUserUpdated!;
};
