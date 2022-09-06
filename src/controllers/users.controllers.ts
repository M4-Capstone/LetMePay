import { Request, Response } from "express";
import getCurrentUserService from "../services/users/getCurrentUser.service";

const getCurrentUserController = async (req: Request, res: Response) => {
  const id = req.user.id;
  const user = await getCurrentUserService(id);

  return res.json(user);
};

export { getCurrentUserController };
