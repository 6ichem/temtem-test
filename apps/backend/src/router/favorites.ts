import express from "express";
import { createUser, signIn } from "../services/auth.service";
import { validateBody } from "../middlewares/validateBody";
import { createUserDto } from "../interfaces/dto/auth.dto";
import { authenticateJWT } from "../middlewares/authenticateJWT";
import {
  createFavoriteDto,
  deleteFavoriteDto,
} from "../interfaces/dto/favorites.dto";
import { addToFavorites } from "../services/favorites.service";

const router = express.Router();

router.get("/", authenticateJWT, async (req, res) => {
  try {
    const resp = await createUser(req);

    return res.json(resp);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
});

router.put(
  "/add",
  validateBody(createFavoriteDto),
  authenticateJWT,
  async (req, res) => {
    try {
      const resp = await addToFavorites(req);

      return res.json(resp);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
);

router.delete(
  "/remove",
  validateBody(deleteFavoriteDto),
  authenticateJWT,
  async (req, res) => {
    try {
      const resp = await signIn(req);

      return res.json(resp);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
);

export default router;
