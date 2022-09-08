import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { IUserRequest } from "../interfaces/users";
import createUserService from "../services/users/createUser.service";
import Users from "../entities/users.entity";
import getCurrentUserService from "../services/users/getCurrentUser.service";
import getUserbyKeyword from "../services/users/getUserByKeyword.service";
import { deleteUserService } from "../services/users/deleteUser.service";
import getCurrentUserService from "../services/users/getCurrentUser.service";
import { deleteUserService } from "../services/users/deleteUser.service";
import { updateUserService } from "../services/users/updateUser.service";


const getCurrentUserController = async (req: Request, res: Response) => {
  const id = req.user.id;
  const foundUser: Users = await getCurrentUserService(id);

  const { password, ...user } = foundUser;

  return res.json(user);
};

const createUserController = async (req: Request, res: Response) => {
  const userData: IUserRequest = req.body;
  const newUser = await createUserService(userData);
  return res.status(201).json(instanceToPlain(newUser));
};

const getUserKeywordController = async (req: Request, res: Response) => {
  const { keyword } = req.params;

  const user: Users[] = await getUserbyKeyword(keyword);

  return res.json(user);
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

export { createUserController,getCurrentUserController, deleteUserController, updateUserController, getUserKeywordController };


