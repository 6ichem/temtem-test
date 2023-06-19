import express from "express";

import MessageResponse from "../interfaces/MessageResponse";
import hello from "../router/hello";

const router = express.Router();

router.use("/hello", hello);

export default router;
