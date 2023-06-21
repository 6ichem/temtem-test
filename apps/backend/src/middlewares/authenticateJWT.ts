import { Request, Response, NextFunction } from "express";
import { authenticateToken } from "../utils";

export interface CustomRequest extends Request {
  userId?: number;
}

export const authenticateJWT = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = await authenticateToken(req);
    req.userId = userId !== null ? userId : undefined;

    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
