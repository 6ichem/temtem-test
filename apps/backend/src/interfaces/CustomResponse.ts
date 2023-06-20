import { User } from "@prisma/client";

export interface AuthUser {
  id: number;
  username: string;
  token: string;
}
