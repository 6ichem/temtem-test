import express from "express";

import MessageResponse from "../interfaces/MessageResponse";

import hello from "../router/hello";
import auth from "../router/auth";
import favorites from "../router/favorites";

const router = express.Router();

router.use("/hello", hello);
router.use("/auth", auth);
router.use("/favorites", auth);

export default router;
