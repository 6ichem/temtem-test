import express from "express";

const router = express.Router();

type HelloResponse = string[];

router.get<{}, HelloResponse>("/", (req, res) => {
  res.json(["😀", "😳", "🙄"]);
});

export default router;
