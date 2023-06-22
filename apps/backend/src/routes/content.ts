import express from "express";
import { authenticateJWT } from "../middlewares/authenticateJWT";
import {
  getAiringToday,
  getContentDetails,
  getContentTrailer,
  getTopRatedMovies,
  getTopRatedShows,
  getTrending,
  getUpcoming,
  querySearch,
} from "../services/content.service";

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

router.get("/details", authenticateJWT, async (req, res) => {
  try {
    const resp = await getContentDetails(req);

    return res.json(resp);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
});

router.get("/trailer", authenticateJWT, async (req, res) => {
  try {
    const resp = await getContentTrailer(req);

    return res.json(resp);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
});

router.get("/airing-today", authenticateJWT, async (req, res) => {
  try {
    const resp = await getAiringToday();

    return res.json(resp);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
});

router.get("/upcoming-movies", authenticateJWT, async (req, res) => {
  try {
    const resp = await getUpcoming();

    return res.json(resp);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
});

router.get("/top-rated-movies", authenticateJWT, async (req, res) => {
  try {
    const resp = await getTopRatedMovies(req);

    return res.json(resp);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
});

router.get("/top-rated-shows", authenticateJWT, async (req, res) => {
  try {
    const resp = await getTopRatedShows(req);

    return res.json(resp);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
});

export default router;
