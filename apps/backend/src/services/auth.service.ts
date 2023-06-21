import { PrismaClient, User } from "@prisma/client";
import { Request } from "express";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthUser } from "../interfaces/CustomResponse";
import { getUserIdFromToken } from "../utils";

const prisma = new PrismaClient();

const jwtSecret = process.env.JWT_SECRET ?? "";

export async function createUser(request: Request): Promise<AuthUser> {
  try {
    const { username, password } = request.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ userId: user.id }, jwtSecret, {
      expiresIn: "7d",
    });

    return { id: user.id, username: user.username, token };
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new Error("Username already exists");
    }

    throw new Error(error.toString() || "An internal error occurred");
  }
}

export async function signIn(request: Request): Promise<AuthUser> {
  try {
    const { username, password } = request.body;

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid username or password");
    }

    const token = jwt.sign({ userId: user.id }, jwtSecret, {
      expiresIn: "7d",
    });

    return { id: user.id, username: user.username, token };
  } catch (error: any) {
    throw new Error(error.toString() || "An internal error occurred");
  }
}

export const getUser = async (req: Request) => {
  try {
    const userId = getUserIdFromToken(req);

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        favorites: { select: { content: true } },
      },
    });

    const filteredUser = {
      ...user,
      favorites: user?.favorites.map((favorite) => favorite.content),
    };
    return filteredUser;
  } catch (error: any) {
    throw new Error(error.toString() || "An internal error occurred");
  }
};
