import { EntityManager } from "typeorm";

import AppDataSource from "../../data-source";
import Addresses from "../../entities/addresses.entity";
import { AppError } from "../../errors/AppError";
import { IAddress } from "../../interfaces/address";

const createAddressService = async (
  { zipCode, street, number, neighbourhood, city, state }: IAddress,
  customManager?: EntityManager
) => {
  const addrRepo = AppDataSource.getRepository(Addresses);
  const manager = customManager || addrRepo.manager;

  // const foundAddress = await addrRepo.findOneBy([
  //   { zipCode },
  //   { street, number, neighbourhood },
  // ]);
  // if (foundAddress)
  //   throw new AppError("There is already an existing address", 409);

  // seria interessante permitir enderecos iguais, pois podem ser da mesma familia ou etc.

  const address = manager.create(Addresses, {
    zipCode,
    street,
    number,
    neighbourhood,
    city,
    state,
  });
  const savedAddress = await manager.save(address);

  return savedAddress;
};

export default createAddressService;
