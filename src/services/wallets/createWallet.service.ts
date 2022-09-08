import { EntityManager } from "typeorm";

import AppDataSource from "../../data-source";
import Wallets from "../../entities/wallets.entity";
import getCurrentUserService from "../users/getCurrentUser.service";
import { AppError } from "../../errors/AppError";
import { IWallet } from "../../interfaces/wallets";

const createWalletService = async (
  { ownerDocument }: IWallet,
  customManager?: EntityManager
) => {
  const walletRepo = AppDataSource.getRepository(Wallets);
  const manager = customManager || walletRepo.manager;

  /* const foundWallet = await walletRepo.findOneBy({
    owner: { documentId: ownerDocument },
  });
  if (foundWallet)
    throw new AppError(
      "There is already an existing wallet for this user",
      409
    ); */

  //const user = await getCurrentUserService(ownerDocument);

  const wallet = manager.create(Wallets);
  const savedWallet = await manager.save(wallet);

  return savedWallet;
};

export default createWalletService;
