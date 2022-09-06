import { Request, Response } from "express";
import getCurrentUserService from "../services/users/getCurrentUser.service";
import getUserbyKeyword from "../services/users/getUserByKeyword.service";

const getCurrentUserController = async (req: Request, res: Response) => {
  const id = req.user.id;
  const user = await getCurrentUserService(id);

  return res.json(user);
};

const getUserKeywordController = async (req: Request, res: Response) => {
  const { keyword } = req.params;

  const user = await getUserbyKeyword(keyword);

  return res.json(user);
};

export { getCurrentUserController, getUserKeywordController };
