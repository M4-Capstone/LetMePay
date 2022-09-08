import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import "dotenv/config";

import AppDataSource from "../../data-source";
import Users from "../../entities/users.entity";
import { IUserLogin } from "../../interfaces/users";
import { AppError } from "../../errors/AppError";

const createSessionService = async ({ email, password }: IUserLogin) => {
  const userRepo = AppDataSource.getRepository(Users);

  const user = await userRepo.findOneBy({ email });
  if (!user) throw new AppError("Invalid email or password", 401);

  const pwdMatch = await compare(password, user.password);
  if (!pwdMatch) throw new AppError("Invalid email or password", 401);

  const token = jwt.sign(
    {
      email,
    },
    process.env.SECRET_KEY!,
    {
      subject: user.documentId,
      expiresIn: "20m",
    }
  );

  return token;
};

export default createSessionService;
