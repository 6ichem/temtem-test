import { NextFunction, Request, Response } from "express";

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);

  console.log(req);
  const error = new Error(`🔍 - Route Not Found`);
  next(error);
}
