import express from "express";
import { verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/protected", verifyToken, (req, res) => {
  res.json({
    message: "Welcome to the protected route!",
    user: (req as any).user,
  });
});

export default router;
