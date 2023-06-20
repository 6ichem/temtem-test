import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { Request, Response, NextFunction } from "express";

export const validateBody =
  <T>(dtoClass: new () => T) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToClass(dtoClass, req.body);
    const errors = await validate(dto as unknown as Record<keyof T, unknown>);

    if (errors.length > 0) {
      const errorMessages = errors.flatMap((error) =>
        Object.values(error.constraints || {})
      );
      return res.status(400).json({ errors: errorMessages });
    }

    next();
  };
