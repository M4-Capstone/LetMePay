import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";

const validateSchemaMiddleware =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const validated = await schema.validate(data, {
        stripUnknown: true,
      });
      req.body = validated;
      next();
    } catch (error: any) {
      return res.status(400).json({
        message: error.errors?.join(", "),
      });
    }
  };

export { validateSchemaMiddleware };
