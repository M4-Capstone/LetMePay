import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { IUserRequest } from "../interfaces/users";
import createUserService from "../services/users/createUser.service";
import getCurrentUserService from "../services/users/getCurrentUser.service";
import { deleteUserService } from "../services/users/deleteUser.service";
import { updateUserService } from "../services/users/updateUser.service";

const getCurrentUserController = async (req: Request, res: Response) => {
  const id = req.user.id;
  const user = await getCurrentUserService(id);

  return res.json(user);
};

const createUserController = async (req: Request, res: Response) => {
  const userData: IUserRequest = req.body;
  const newUser = await createUserService(userData);
  return res.status(201).json(instanceToPlain(newUser));
};

const deleteUserController = async (req:Request, res:Response) =>{

  const id = req.user.id

  const deleteUser = await deleteUserService(id)

  return res.status(204).send()

}

const updateUserController = async (req:Request, res:Response) =>{

  const id = req.user.id

  const { name, email, password } = req.body

  const updateUser = await updateUserService(id, {name, email, password})

  return res.json(instanceToPlain(updateUser))

} 

export { getCurrentUserController, createUserController, deleteUserController, updateUserController };
