import { Request, Response } from "express";
import Users from "../entities/users.entity";
import getCurrentUserService from "../services/users/getCurrentUser.service";
import getUserbyKeyword from "../services/users/getUserByKeyword.service";

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

export { getCurrentUserController, getUserKeywordController };
