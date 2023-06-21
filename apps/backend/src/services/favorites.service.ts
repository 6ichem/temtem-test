import { PrismaClient, User } from "@prisma/client";
import { Request } from "express";
import jwt from "jsonwebtoken";
import { getUserIdFromToken } from "../utils";

const prisma = new PrismaClient();

export const addToFavorites = async (req: Request) => {
  try {
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
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new Error("Content already exists");
    }

    throw new Error(error.toString() || "An internal error occurred");
  }
};

export const removeFromFavorites = async (req: Request) => {
  try {
    const { id }: any = req.query;
    const userId = getUserIdFromToken(req);

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const favorite = await prisma.favorite.deleteMany({
      where: {
        userId,
        contentId: parseInt(id),
      },
    });

    return favorite;
  } catch (error: any) {
    throw new Error(error.toString());
  }
};
