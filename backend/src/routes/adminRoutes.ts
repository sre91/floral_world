import express from "express";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware";
import User from "../models/User";
import Product from "../models/Product";

const router = express.Router();

router.get("/dashboard", verifyAdmin, (req, res) => {
  res.json({ message: "Welcome Admin 🌸 — Dashboard access granted!" });
});

router.get("/stats", verifyToken, verifyAdmin, async (req, res) => {
  const users = await User.countDocuments();
  const admins = await User.countDocuments({ isAdmin: true });
  const products = await Product.countDocuments();
  res.json({ users, admins, products });
});

export default router;
