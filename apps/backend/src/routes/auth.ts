import express from "express";
import { createUser, getUser, signIn } from "../services/auth.service";
import { validateBody } from "../middlewares/validateBody";
import { createUserDto } from "../interfaces/dto/auth.dto";
import { authenticateJWT } from "../middlewares/authenticateJWT";

const router = express.Router();

router.post("/sign-up", validateBody(createUserDto), async (req, res) => {
  try {
    const resp = await createUser(req);

    return res.json(resp);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
});

router.post("/sign-in", validateBody(createUserDto), async (req, res) => {
  try {
    const resp = await signIn(req);

    return res.json(resp);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
});

router.get("/user", authenticateJWT, async (req, res) => {
  try {
    const resp = await getUser(req);

    return res.json(resp);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
});

export default router;
