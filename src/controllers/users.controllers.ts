import { Request, Response } from "express";
import { deleteUserService } from "../services/users/deleteUser.service";
import getCurrentUserService from "../services/users/getCurrentUser.service";
import { updateUserService } from "../services/users/updateUser.service";
import {instanceToPlain} from "class-transformer"

const getCurrentUserController = async (req: Request, res: Response) => {
  const id = req.user.id;
  const user = await getCurrentUserService(id);

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

export { getCurrentUserController, deleteUserController, updateUserController };
