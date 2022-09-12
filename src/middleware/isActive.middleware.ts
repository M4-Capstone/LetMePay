import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

const userIsActiveMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isActive = req.user.isActive;
  if (!isActive) {
    throw new AppError("User is not active", 403);
  }
  next();
};
export { userIsActiveMiddleware };
