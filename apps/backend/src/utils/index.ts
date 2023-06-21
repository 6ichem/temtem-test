import { Request } from "express";
import jwt, { VerifyCallback, Secret } from "jsonwebtoken";
import { JwtPayload } from "../interfaces/utils";
import { MEDIA_TYPES } from "./constants";

const jwtSecret = process.env.JWT_SECRET ?? "";

export function authenticateToken(request: Request): Promise<number | null> {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return Promise.resolve(null);
  }

  return new Promise<number | null>((resolve, reject) => {
    jwt.verify(token, jwtSecret, (error, decoded: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(decoded?.userId || null);
      }
    });
  });
}

export const getUserIdFromToken = (req: Request): number | null => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    return decoded.userId;
  } else {
    throw new Error("User not authenticated");
  }

  return null;
};

export const getMediaURL = (mediaType: string) => {
  switch (mediaType) {
    case MEDIA_TYPES.MOVIE:
      return "/movie";
    case MEDIA_TYPES.TV:
      return "/tv";
    default:
      break;
  }
};
