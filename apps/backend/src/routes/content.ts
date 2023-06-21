import express from "express";
import { authenticateJWT } from "../middlewares/authenticateJWT";
import { getTrending, querySearch } from "../services/content.service";

const router = express.Router();

router.get("/trending", authenticateJWT, async (req, res) => {
  try {
    const resp = await getTrending();

    return res.json(resp);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
});

router.get("/search", authenticateJWT, async (req, res) => {
  try {
    const resp = await querySearch(req);

    return res.json(resp);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
});

export default router;
