import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import Users from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";
import { IUserRequest } from "../../interfaces/users";
import createAddressService from "../addresses/createAddress.service";
import createWalletService from "../wallets/createWallet.service";

const createUserService = async ({
  documentId,
  address,
  email,
  name,
  password,
}: IUserRequest) => {
  const userRepo = AppDataSource.getRepository(Users);

  const foundUser = await userRepo.findOneBy({ documentId });
  if (foundUser) throw new AppError("User already exists", 409);

  // faz uma transaction para garantir que
  // todas as entradas nas tabelas poderão ser feitas
  // antes de salvar
  await userRepo.manager.transaction(async (manager) => {
    const savedAddress = await createAddressService(address, manager);
    const savedWallet = await createWalletService({
      ownerDocument: documentId,
    });

    const user = userRepo.create({
      address: savedAddress,
      wallet: savedWallet,
      documentId,
      email,
      name,
      password: await hash(password, 10),
    });
    manager.save(user);
  });

  // const finalUser = await userRepo.findOneByOrFail({ documentId });
  const finalUser = await userRepo.findOne({
    where: {
      documentId,
    },
    relations: {
      address: true,
    },
  });
  return finalUser;
};

export default createUserService;
