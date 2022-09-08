import { Request, Response } from "express";
import Users from "../entities/users.entity";
import getCurrentUserService from "../services/users/getCurrentUser.service";
import getUserbyKeyword from "../services/users/getUserByKeyword.service";
import { deleteUserService } from "../services/users/deleteUser.service";
import getCurrentUserService from "../services/users/getCurrentUser.service";
import { updateUserService } from "../services/users/updateUser.service";
import {instanceToPlain} from "class-transformer"


const getCurrentUserController = async (req: Request, res: Response) => {
  const id = req.user.id;
  const foundUser: Users = await getCurrentUserService(id);

  const { password, ...user } = foundUser;

  return res.json(user);
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

export { getCurrentUserController, deleteUserController, updateUserController, getUserKeywordController };

