import { PrismaClient, User } from "@prisma/client";
import { Request } from "express";
import jwt from "jsonwebtoken";
import { getUserIdFromToken } from "../utils";

const prisma = new PrismaClient();
const jwtSecret = process.env.JWT_SECRET || "";

export const addToFavorites = async (req: Request) => {
  const { title, description, bannerUrl, moviedbId } = req.body;
  const userId = getUserIdFromToken(req);

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const favorite = await prisma.favorite.create({
    data: {
      user: {
        connect: { id: userId },
      },
      content: {
        connectOrCreate: {
          where: { moviedbId: moviedbId },
          create: {
            title,
            description,
            bannerUrl,
            moviedbId,
          },
        },
      },
    },
    include: {
      content: true,
    },
  });

  return favorite;
};

export const removeFromFavorites = async (req: Request) => {
  const { contentId } = req.body;
  const userId = getUserIdFromToken(req);

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const favorite = await prisma.favorite.deleteMany({
    where: {
      userId,
      contentId,
    },
  });

  return favorite;
};

export const getFavorites = async (req: Request) => {
  const userId = getUserIdFromToken(req);

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const favorites = await prisma.favorite.findMany({
    where: {
      userId,
    },
    include: {
      content: true,
    },
  });

  return favorites;
};
