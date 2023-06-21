import express from "express";

import auth from "../routes/auth";
import favorites from "../routes/favorites";
import content from "../routes/content";

const router = express.Router();

router.use("/auth", auth);
router.use("/favorites", favorites);
router.use("/content", content);

export default router;
